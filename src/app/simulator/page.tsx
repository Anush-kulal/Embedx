"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Lock, Unlock, RefreshCw } from "lucide-react";

export default function HomeSimulator() {
  const [state, setState] = useState({ lights: 'harsh_white', door: 'locked' });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/home-state');
        const data = await res.json();
        setState(data);
      } catch (e) {
        console.error("Failed to fetch home state", e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    await fetch('/api/reset-home', { method: 'POST' });
    setState({ lights: 'harsh_white', door: 'locked' });
  };

  const isAmber = state.lights === 'amber';
  const isUnlocked = state.door === 'unlocked';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-1000 ${isAmber ? 'bg-amber-100 text-amber-900' : 'bg-white text-zinc-900'}`}>
      
      {/* Reset button for demo purposes */}
      <div className="absolute top-8 right-8">
        <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm font-medium">Reset Sim</span>
        </button>
      </div>

      <div className="text-center max-w-2xl px-6">
        <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 transition-colors duration-1000 ${isAmber ? 'text-amber-800' : 'text-zinc-800'}`}>
          Simulated Home Environment
        </h1>
        
        <p className={`text-xl md:text-2xl mb-16 transition-colors duration-1000 ${isAmber ? 'text-amber-700/80' : 'text-zinc-500'}`}>
          {isAmber 
            ? "Therapeutic ambient sequence activated. Breathing regulates. Anxiety drops."
            : "Standard harsh lighting. Reactive environment."}
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Light Status Indicator */}
          <div className={`w-64 h-64 rounded-3xl flex flex-col items-center justify-center border-2 transition-all duration-1000 shadow-xl ${isAmber ? 'bg-amber-500/20 border-amber-500/30 shadow-amber-500/20' : 'bg-zinc-50 border-zinc-200'}`}>
            {isAmber ? (
              <Moon className="w-20 h-20 text-amber-600 mb-4 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
            ) : (
              <Sun className="w-20 h-20 text-yellow-500 mb-4" />
            )}
            <span className="text-xl font-semibold">
              {isAmber ? 'Amber Hues' : 'Harsh White'}
            </span>
          </div>

          {/* Door Status Indicator */}
          <div className={`w-64 h-64 rounded-3xl flex flex-col items-center justify-center border-2 transition-all duration-1000 shadow-xl ${isUnlocked ? 'bg-green-500/10 border-green-500/30 shadow-green-500/20' : isAmber ? 'bg-amber-500/10 border-amber-500/20' : 'bg-zinc-50 border-zinc-200'}`}>
            {isUnlocked ? (
              <Unlock className="w-20 h-20 text-green-600 mb-4" />
            ) : (
              <Lock className={`w-20 h-20 mb-4 ${isAmber ? 'text-amber-700/50' : 'text-zinc-400'}`} />
            )}
            <span className="text-xl font-semibold">
              {isUnlocked ? 'Door Unlocked' : 'Door Locked'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
