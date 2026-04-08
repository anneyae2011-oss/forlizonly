import { NextRequest, NextResponse } from "next/server";
import { NanaGateway } from "@/lib/gateway";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, modelGroup, method, url, headers, data } = body;

    if (!provider || !url) {
      return NextResponse.json({ error: "Provider and URL are required" }, { status: 400 });
    }

    const result = await NanaGateway.handleRequest({
      provider,
      modelGroup,
      method: method || "POST",
      url,
      headers: headers || {},
      data,
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Gateway Error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Internal Gateway Error",
        details: error.response?.data || null 
      }, 
      { status: error.response?.status || 500 }
    );
  }
}
