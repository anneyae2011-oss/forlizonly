"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Key, 
  AlertTriangle,
  ChevronRight,
  Plus
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const stats = [
    { label: "Active Keys", value: "12", icon: Key, color: "text-pink-500" },
    { label: "Total Requests", value: "8.4k", icon: Activity, color: "text-blue-400" },
    { label: "Success Rate", value: "99.9%", icon: ShieldCheck, color: "text-green-400" },
    { label: "Fallback Triggers", value: "24", icon: AlertTriangle, color: "text-yellow-400" },
  ];

  return (
    <main className="flex-1 p-8 relative overflow-hidden bg-[#08080c]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <header className="flex justify-between items-center mb-12 relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tighter neon-text mb-2"
          >
            NANA<span className="text-white">TWO</span>
          </motion.h1>
          <p className="text-zinc-500 text-sm font-inter uppercase tracking-[0.2em]">AI Gateway Infrastructure</p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-2 rounded-none border border-pink-500/30 flex items-center gap-2 hover:neon-border transition-all duration-300">
            <Plus size={18} className="text-pink-500" />
            <span className="text-sm uppercase tracking-widest">Enroll Key</span>
          </button>
          <div className="glass px-4 py-2 rounded-none border border-zinc-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs uppercase tracking-tighter text-zinc-400">System Live</span>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 border border-zinc-800/50 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-4">
              <stat.icon size={24} className={stat.color} />
              <Zap size={14} className="text-zinc-700" />
            </div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* API Keys Table */}
        <div className="lg:col-span-2 glass border border-zinc-800/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <Key size={20} className="text-pink-500" />
              Active Nodes
            </h2>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((node) => (
              <div 
                key={node}
                className="flex items-center justify-between p-4 bg-white/5 border border-zinc-800 hover:border-pink-500/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                    <span className="text-pink-500 font-bold">O</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">OpenAI Main Branch</h4>
                    <p className="text-xs text-zinc-500 font-inter">sk-...a8f1 • GPT-4o-mini</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 uppercase tracking-tighter">Usage</p>
                    <p className="text-sm font-bold">1.2k req</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] uppercase font-bold text-green-500">Online</span>
                  </div>
                  <ChevronRight size={18} className="text-zinc-700 group-hover:text-pink-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fallback Log */}
        <div className="glass border border-zinc-800/50 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 mb-6">
            <AlertTriangle size={20} className="text-yellow-500" />
            Fallback Trace
          </h2>
          <div className="space-y-6">
            {[ 
              { time: "2m ago", event: "Switch to Backup-1", reason: "429 Rate Limit", target: "Gemini Pro" },
              { time: "15m ago", event: "Node Depletion", reason: "403 Forbidden", target: "OpenAI-2" },
              { time: "1h ago", event: "Auto-Migration", reason: "502 Bad Gateway", target: "Anthropic" },
            ].map((log, i) => (
              <div key={i} className="relative pl-6 border-l border-zinc-800 pb-1">
                <div className="absolute w-2 h-2 bg-pink-500 -left-[4.5px] top-1.5 shadow-[0_0_8px_#ff00ff]" />
                <p className="text-[10px] text-zinc-500 uppercase mb-1">{log.time}</p>
                <h4 className="text-sm font-bold mb-1">{log.event}</h4>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 border border-red-500/20 uppercase font-bold">
                    {log.reason}
                  </span>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 border border-blue-500/20 uppercase font-bold">
                    {log.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-xs uppercase tracking-widest text-zinc-500 border border-zinc-800 hover:border-zinc-700 transition-all">
            View Protocol History
          </button>
        </div>

      </div>

      {/* Floating Status Bar Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 glass border-t border-zinc-800 flex items-center px-8 z-50">
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="text-pink-500">Latency:</span> 124ms
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-500">Node:</span> Vercel-HKG-1
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-500">Enc:</span> AES-256-GCM
          </span>
        </div>
      </footer>
    </main>
  );
}
