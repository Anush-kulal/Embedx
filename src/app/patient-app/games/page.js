'use client';

import { useRouter } from 'next/navigation';

export default function GamesMenu() {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex flex-col p-6 bg-slate-900 text-white select-none">
      <div className="w-full max-w-md mx-auto flex justify-between items-center mb-8 mt-4">
        <button 
          onClick={() => router.push('/patient-app')}
          className="px-4 py-2 bg-slate-800 rounded-full text-sm font-bold text-white/70 hover:text-white"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-black tracking-tight">Activities</h1>
        <div className="w-16"></div> {/* Spacer to keep title centered */}
      </div>

      <div className="flex-1 w-full max-w-md mx-auto flex flex-col gap-4">
        <p className="text-white/60 text-sm mb-4">Select an activity to activate your brain:</p>

        <button 
          onClick={() => router.push('/patient-app/games/memory')}
          className="flex items-center gap-4 p-4 bg-indigo-500 hover:bg-indigo-400 rounded-2xl transition-all shadow-lg active:scale-95 text-left"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
            🧠
          </div>
          <div>
            <h2 className="text-xl font-bold">Memory Match</h2>
            <p className="text-white/80 text-sm">Find the matching pairs.</p>
          </div>
        </button>

        {/* Calm Puzzle Button */}
        <button 
          onClick={() => router.push('/patient-app/games/puzzle')}
          className="flex items-center gap-4 p-4 bg-sky-600 hover:bg-sky-500 rounded-2xl transition-all shadow-lg active:scale-95 text-left"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
            🧩
          </div>
          <div>
            <h2 className="text-xl font-bold">Calm Puzzle</h2>
            <p className="text-white/80 text-sm">Drag & drop to order items.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
