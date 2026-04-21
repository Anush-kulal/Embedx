'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function GamesMenu() {
  const router = useRouter();

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-public-sans select-none flex flex-col p-6">
      <div className="w-full max-w-md mx-auto flex justify-between items-center mb-8 mt-4">
        <button 
          onClick={() => router.push('/patient-app')}
          className="flex flex-col items-center justify-center w-12 h-12 bg-white border border-[#d2e6ef] text-[#003c90] rounded-full hover:bg-slate-50 transition-colors active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-extrabold tracking-tight font-manrope text-[#003c90]">Activities</h1>
        <div className="w-12"></div> {/* Spacer to keep title centered */}
      </div>

      <div className="flex-1 w-full max-w-md mx-auto flex flex-col gap-4">
        <p className="text-[#191c1e]/70 text-sm mb-4 font-semibold px-1">Select an activity to activate your brain:</p>

        <button 
          onClick={() => router.push('/patient-app/games/memory')}
          className="flex items-center gap-5 p-5 bg-white border border-[#d2e6ef] hover:bg-slate-50 rounded-2xl transition-all shadow-sm active:scale-95 text-left group"
        >
          <div className="w-16 h-16 bg-[#e1f5fe]/80 text-[#003c90] rounded-xl flex items-center justify-center text-3xl group-hover:bg-[#d2e6ef] transition-colors">
            🧠
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#003c90] font-manrope leading-tight mb-1">Memory Match</h2>
            <p className="text-[#191c1e]/70 text-sm">Find the matching pairs.</p>
          </div>
        </button>

        {/* Calm Puzzle Button */}
        <button 
          onClick={() => router.push('/patient-app/games/puzzle')}
          className="flex items-center gap-5 p-5 bg-white border border-[#d2e6ef] hover:bg-slate-50 rounded-2xl transition-all shadow-sm active:scale-95 text-left group"
        >
          <div className="w-16 h-16 bg-[#e1f5fe]/80 text-[#003c90] rounded-xl flex items-center justify-center text-3xl group-hover:bg-[#d2e6ef] transition-colors">
            🧩
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#003c90] font-manrope leading-tight mb-1">Calm Puzzle</h2>
            <p className="text-[#191c1e]/70 text-sm">Drag & drop to order items.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
