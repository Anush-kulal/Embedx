'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, HeartPulse } from 'lucide-react';

export default function VitalsPage() {
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
        <h1 className="text-2xl font-extrabold tracking-tight font-manrope text-[#003c90]">Vitals History</h1>
        <div className="w-12"></div> {/* Spacer to keep title centered */}
      </div>

      <div className="flex-1 w-full max-w-md mx-auto flex flex-col gap-4 text-center items-center justify-center">
        <div className="w-24 h-24 bg-[#e1f5fe] text-[#003c90] rounded-full flex items-center justify-center mb-4 shadow-sm">
          <HeartPulse className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-[#003c90] font-manrope mb-2">Vitals Tracking</h2>
        <p className="text-[#191c1e]/70 text-sm max-w-[280px] leading-relaxed">
          Your detailed vitals history and analytics will appear here. This feature is currently in development for the next Nivero update.
        </p>
      </div>
    </div>
  );
}
