"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("ACCESS DENIED: INVALID FRAGMENT");
      }
    } catch (err) {
      setError("SYSTEM ERROR: UNABLE TO AUTHENTICATE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-8 relative z-10 border border-pink-500/20"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 0px #ff00ff", "0 0 20px #ff00ff", "0 0 0px #ff00ff"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/30 mb-4"
          >
            <ShieldCheck size={32} className="text-pink-500" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tighter neon-text uppercase">Security Node</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-inter">NanaTwo Protocol Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-zinc-500 group-focus-within:text-pink-500 transition-colors" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER DECRYPTION KEY"
              className="w-full bg-black/40 border border-zinc-800 py-3 pl-10 pr-4 text-sm font-inter tracking-widest focus:border-pink-500/50 outline-none transition-all placeholder:text-zinc-700"
              required
            />
            <div className="absolute bottom-0 left-0 h-[1px] bg-pink-500 w-0 group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#ff00ff]" />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-400 text-[10px] items-center bg-red-500/10 p-2 border border-red-500/20 uppercase font-bold"
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500/10 border border-pink-500/30 py-3 flex items-center justify-center gap-2 hover:bg-pink-500 hover:text-black transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              {loading ? "DECRYPTING..." : "INITIALIZE SESSION"}
            </span>
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <div className="text-[8px] uppercase tracking-tighter font-inter text-zinc-500">Node-HKG-1</div>
           <div className="text-[8px] uppercase tracking-tighter font-inter text-zinc-500">AES-256</div>
           <div className="text-[8px] uppercase tracking-tighter font-inter text-zinc-500">TLS v1.3</div>
        </div>
      </motion.div>

      {/* Retro scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.05)_50%,transparent_100%)] bg-[size:100%_4px] opacity-10" />
    </div>
  );
}
