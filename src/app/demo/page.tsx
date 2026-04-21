"use client";

import { useState } from "react";

export default function DemoPage() {
  const [isAmber, setIsAmber] = useState(false);

  const triggerLights = async () => {
    try {
      const response = await fetch('/api/trigger-lights', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setIsAmber(true);
      }
    } catch (error) {
      console.error("Failed to trigger lights", error);
    }
  };

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 ${
        isAmber ? 'bg-amber-500' : 'bg-white'
      }`}
    >
      <h1 className={`text-4xl font-bold mb-8 ${isAmber ? 'text-white' : 'text-black'}`}>
        Home Environment Demo
      </h1>
      
      <button 
        onClick={triggerLights}
        className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
      >
        Trigger Therapeutic Sequence
      </button>
    </div>
  );
}
