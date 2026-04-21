'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const correctOrder = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];

export default function CalmPuzzle() {
  const router = useRouter();
  const [pieces, setPieces] = useState([]);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    shufflePieces();
  }, []);

  const shufflePieces = () => {
    // Shuffle but ensure it's not already in the correct order
    let shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    while (shuffled.every((p, i) => p === correctOrder[i])) {
      shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    }
    setPieces(shuffled);
    setIsWon(false);
    setLastInteraction(Date.now());
  };

  // Safety tracking - if no interaction for 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastInteraction > 60000 && !isAlertTriggered && !isWon) {
        setIsAlertTriggered(true);
        // Automatically redirect back to the monitoring app with potential warning
        alert("Prolonged inactivity detected. Returning to safety monitor.");
        router.push('/patient-app');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastInteraction, isAlertTriggered, isWon, router]);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    setLastInteraction(Date.now());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newPieces = [...pieces];
    // Swap the pieces
    const temp = newPieces[index];
    newPieces[index] = newPieces[draggedIndex];
    newPieces[draggedIndex] = temp;

    setPieces(newPieces);
    setDraggedIndex(null);
    setLastInteraction(Date.now());

    // Check win condition
    if (newPieces.every((p, i) => p === correctOrder[i])) {
      setIsWon(true);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center p-6 bg-slate-900 text-white select-none">
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <button 
          onClick={() => router.push('/patient-app/games')}
          className="px-4 py-2 bg-slate-800 rounded-full text-sm font-bold text-white/70 hover:text-white"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-black tracking-tight">Calm Puzzle</h1>
        <div className="w-16"></div> {/* spacer for centering */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <p className="text-white/60 mb-6 font-medium text-center">Drag the blocks to put them in the correct 1, 2, 3, 4 sequence:</p>
        
        <div className={`grid grid-cols-2 gap-4 w-full ${isWon ? 'mb-4' : 'mb-12'}`}>
          {pieces.map((piece, index) => (
            <div
              key={index}
              draggable={!isWon}
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              className={`h-32 rounded-[2rem] flex items-center justify-center text-6xl transition-all duration-300 shadow-lg ${
                isWon 
                ? 'bg-emerald-500/20 border-4 border-emerald-500/50 scale-105' 
                : 'bg-sky-600 border-b-8 border-sky-800 cursor-grab active:cursor-grabbing hover:bg-sky-500'
              }`}
            >
              {piece}
            </div>
          ))}
        </div>

        {isWon && (
          <div className="text-center mb-8 animate-bounce">
            <h2 className="text-3xl font-black text-emerald-400 drop-shadow-md mb-2">Beautiful! 🌸</h2>
            <p className="text-white/70">Puzzle completed successfully.</p>
          </div>
        )}

        <button 
          onClick={shufflePieces}
          className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-lg font-bold tracking-widest uppercase transition-colors border border-white/10 mt-4"
        >
          {isWon ? "Play Again" : "Restart Puzzle"}
        </button>
      </div>

      <p className="text-[10px] text-white/30 text-center font-mono mt-auto uppercase tracking-widest font-bold">
        Safety Timer: 60s inactivity alert
      </p>
    </div>
  );
}
