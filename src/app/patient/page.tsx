"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, Activity, Settings2, ChevronUp } from "lucide-react";

export default function PatientPage() {
  const [status, setStatus] = useState<"safe" | "panic" | "inactive">("safe");
  const [devMenuOpen, setDevMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/home-state');
        const data = await res.json();
        if (data.status) setStatus(data.status);
      } catch (e) {
        console.error(e);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (newStatus: "safe" | "panic" | "inactive") => {
    setStatus(newStatus);
    await fetch('/api/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  };

  const StatusDisplay = () => {
    switch (status) {
      case "safe":
        return (
          <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 shadow-2xl transition-all duration-500">
            <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 ring-4 ring-emerald-500/30">
              <ShieldCheck className="w-16 h-16 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">You are safe</h1>
            <p className="text-zinc-400 text-lg text-center">System is actively monitoring your environment.</p>
          </div>
        );
      case "panic":
        return (
          <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-red-950/40 backdrop-blur-xl border border-red-900 shadow-[0_0_50px_-12px_rgba(220,38,38,0.5)] transition-all duration-500">
            <div className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center mb-6 ring-4 ring-red-500/50 animate-pulse">
              <ShieldAlert className="w-16 h-16 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">Emergency</h1>
            <p className="text-red-200 text-lg text-center">Help has been dispatched. Stay calm.</p>
          </div>
        );
      case "inactive":
        return (
          <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-amber-900/50 shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] transition-all duration-500">
            <div className="w-32 h-32 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 ring-4 ring-amber-500/30">
              <Activity className="w-16 h-16 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">Inactive</h1>
            <p className="text-amber-200/70 text-lg text-center">No movement detected recently.</p>
          </div>
        );
    }
  };

  return (
    <main className="relative min-h-screen bg-zinc-950 flex flex-col justify-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none" />

      {/* Main Status Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <StatusDisplay />
      </div>

      {/* Dev Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
        <div className={`w-full max-w-md mx-auto transition-transform duration-300 ease-in-out ${devMenuOpen ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'}`}>
          <div className="bg-zinc-900/80 backdrop-blur-2xl border-t border-x border-zinc-800 rounded-t-[2rem] p-6 shadow-2xl">
            <button 
              onClick={() => setDevMenuOpen(!devMenuOpen)}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-12 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <div className="sr-only">Toggle Dev Menu</div>
              <div className="w-12 h-1.5 bg-zinc-700 rounded-full" />
            </button>
            
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-6">
                <Settings2 className="w-5 h-5 text-zinc-400" />
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Developer Override</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => updateStatus("safe")}
                  className="px-4 py-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-white font-medium transition-colors border border-zinc-700"
                >
                  Reset to Safe
                </button>
                <button 
                  onClick={() => updateStatus("inactive")}
                  className="px-4 py-4 rounded-xl bg-amber-950/30 hover:bg-amber-900/50 text-amber-500 font-medium transition-colors border border-amber-900/50"
                >
                  Force Inactive
                </button>
                <button 
                  onClick={() => updateStatus("panic")}
                  className="px-4 py-4 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-500 font-medium transition-colors border border-red-900/50"
                >
                  Force Panic
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
