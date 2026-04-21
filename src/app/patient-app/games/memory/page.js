'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const cardsData = [
  { id: 1, value: "🍎" },
  { id: 2, value: "🍎" },
  { id: 3, value: "🐶" },
  { id: 4, value: "🐶" },
  { id: 5, value: "🚗" },
  { id: 6, value: "🚗" },
  { id: 7, value: "⭐" },
  { id: 8, value: "⭐" },
];

export default function MemoryGame() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lastPlayed, setLastPlayed] = useState(Date.now());
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setLastPlayed(Date.now());
  };

  // Safety tracking - if no interaction for 30 seconds, go back or trigger alert
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastPlayed > 30000 && !isAlertTriggered && matched.length !== cardsData.length / 2) {
        setIsAlertTriggered(true);
        // Automatically redirect back to the monitoring app with potential warning
        alert("Prolonged inactivity detected during game. Returning to safety monitor.");
        router.push('/patient-app');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastPlayed, isAlertTriggered, matched.length, router]);

  const handleFlip = (index) => {
    setLastPlayed(Date.now());

    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].value)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      if (cards[i1].value === cards[i2].value) {
        setMatched([...matched, cards[i1].value]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
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
        <h1 className="text-2xl font-black tracking-tight">Memory Match</h1>
        <div className="w-16"></div> {/* spacer for centering */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className={`grid grid-cols-4 gap-4 w-full ${matched.length === cardsData.length / 2 ? 'mb-4' : 'mb-12'}`}>
          {cards.map((card, index) => (
            <button
              key={index}
              className={`h-24 md:h-32 text-4xl md:text-5xl rounded-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-lg ${
                flipped.includes(index) || matched.includes(card.value)
                  ? 'bg-emerald-100 rotate-0 border-4 border-emerald-400'
                  : 'bg-indigo-500 hover:bg-indigo-400 rotate-180 border-b-4 border-indigo-700'
              }`}
              onClick={() => handleFlip(index)}
            >
              <div className={`transition-opacity duration-300 ${flipped.includes(index) || matched.includes(card.value) ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}>
                {card.value}
              </div>
            </button>
          ))}
        </div>

        {matched.length === cardsData.length / 2 && (
          <div className="text-center mb-8 animate-bounce">
            <h2 className="text-3xl font-black text-amber-400 drop-shadow-md mb-2">Great Job! 🎉</h2>
            <p className="text-white/70">Cognitive exercise completed.</p>
          </div>
        )}

        <button 
          onClick={shuffleCards}
          className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-lg font-bold tracking-widest uppercase transition-colors border border-white/10"
        >
          Restart Game
        </button>
      </div>
      
      <p className="text-[10px] text-white/30 text-center font-mono mt-auto uppercase tracking-widest font-bold">
        Monitoring interaction speed & frequency
      </p>
    </div>
  );
}
