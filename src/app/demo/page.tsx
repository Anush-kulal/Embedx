"use client";

import { useEffect, useState } from "react";

export default function DemoPage() {
  const [isAmber, setIsAmber] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/home-state');
        const data = await res.json();
        setIsAmber(data.lights === 'amber');
      } catch (e) {
        console.error(e);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerLights = async () => {
    try {
      await fetch('/api/trigger-lights', { method: 'POST' });
    } catch (error) {
      console.error("Failed to trigger lights", error);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 ${isAmber ? 'bg-amber-500' : 'bg-white'}`}>
      <h1 className={`text-4xl font-bold mb-8 ${isAmber ? 'text-white' : 'text-black'}`}>
        Home Environment Demo
      </h1>
      
      <button 
        onClick={triggerLights}
        className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors z-10"
      >
        Trigger Therapeutic Sequence
      </button>

      <div className="absolute top-8 right-8 cursor-pointer z-10">
        <button 
          onClick={() => fetch('/api/reset-home', { method: 'POST' })}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${isAmber ? 'bg-amber-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Reset Environment
        </button>
      </div>
    </div>
  );
}
