import { prisma } from "./prisma";
import axios, { AxiosError } from "axios";

export interface GatewayRequest {
  provider: string;
  modelGroup?: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  data: any;
}

export class NanaGateway {
  static async handleRequest(req: GatewayRequest, retryCount = 0): Promise<any> {
    // 1. Find the best available key
    const keyRecord = await prisma.apiKey.findFirst({
      where: {
        provider: req.provider,
        modelGroup: req.modelGroup || "general",
        status: "ACTIVE",
      },
      orderBy: [
        { priority: "asc" },
        { lastUsed: "asc" },
      ],
    });

    if (!keyRecord) {
      throw new Error(`No active keys found for provider: ${req.provider}`);
    }

    try {
      // 2. Prepare headers (inject the key)
      const headers = { ...req.headers };
      if (req.provider === "openai") {
        headers["Authorization"] = `Bearer ${keyRecord.key}`;
      } else if (req.provider === "gemini") {
        headers["x-goog-api-key"] = keyRecord.key;
      } else if (req.provider === "anthropic") {
        headers["x-api-key"] = keyRecord.key;
        headers["anthropic-version"] = "2023-06-01";
      }

      // 3. Execute request
      const response = await axios({
        method: req.method,
        url: req.url,
        headers,
        data: req.data,
        validateStatus: (status) => status < 400, // Trigger catch on 4xx/5xx
      });

      // Update last used timestamp
      await prisma.apiKey.update({
        where: { id: keyRecord.id },
        data: { lastUsed: new Date(), errorCount: 0 },
      });

      return response.data;

    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;

      // 4. Fallback Logic: Detect errors and retry
      if (status && [401, 403, 429, 500, 502, 503, 504].includes(status)) {
        console.warn(`Key ${keyRecord.id} failed with status ${status}. Triggering fallback...`);

        // Mark key as failed if it hits 4xx/5xx errors
        await prisma.apiKey.update({
          where: { id: keyRecord.id },
          data: { 
            status: status === 429 ? "DEPLETED" : "FAILED", 
            errorCount: { increment: 1 } 
          },
        });

        // Limit retries to prevent infinite loops (e.g. 3 attempts)
        if (retryCount < 3) {
          return this.handleRequest(req, retryCount + 1);
        }
      }

      throw error;
    }
  }
}
