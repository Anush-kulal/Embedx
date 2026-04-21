'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * usePatientState Hook
 * Manages the state machine and inactivity timer.
 */
function usePatientState() {
  const [state, setState] = useState('IDLE');
  const [seconds, setSeconds] = useState(0);

  const reset = useCallback(() => {
    setState('IDLE');
    setSeconds(0);
  }, []);

  useEffect(() => {
    // Stop progression if already in critical state
    if (state === 'CRITICAL_ALERT') return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        // Transition every 5 seconds for demo purposes
        if (next >= 5) {
          if (state === 'IDLE') setState('INACTIVE_WARNING');
          else if (state === 'INACTIVE_WARNING') setState('AWAITING_VOICE');
          else if (state === 'AWAITING_VOICE') setState('CRITICAL_ALERT');
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  return { state, setState, reset, seconds };
}

export default function PatientApp() {
  const { state, setState, reset, seconds } = usePatientState();
  const [tapCount, setTapCount] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  // Hidden tap handler to open dev menu
  const handleSecretTap = (e) => {
    e.stopPropagation();
    const newCount = tapCount + 1;
    if (newCount >= 5) {
      setShowDebug(true);
      setTapCount(0);
    } else {
      setTapCount(newCount);
    }
  };

  const states = {
    IDLE: { color: 'bg-emerald-500', label: 'SYSTEM IDLE', sub: 'Monitoring vitals...' },
    INACTIVE_WARNING: { color: 'bg-amber-400', label: 'INACTIVE WARNING', sub: 'Are you still there?' },
    AWAITING_VOICE: { color: 'bg-sky-500', label: 'AWAITING VOICE', sub: 'Listening for response...' },
    CRITICAL_ALERT: { color: 'bg-rose-600 animate-pulse', label: 'CRITICAL ALERT', sub: 'EMERGENCY DISPATCHED' }
  };

  const current = states[state];

  return (
    <div 
      className={`h-screen w-full flex flex-col items-center justify-center p-6 transition-all duration-700 ${current.color}`}
      onClick={() => !showDebug && reset()}
    >
      <div className="text-center select-none">
        <div className="mb-4 inline-block px-4 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase">
          {state}
        </div>
        <h1 className="text-5xl font-black text-white mb-2 drop-shadow-sm leading-tight">
          {current.label}
        </h1>
        <p className="text-white/90 text-xl font-medium">
          {current.sub}
        </p>
        <div className="mt-12 text-white/40 font-mono text-sm">
          Auto-transition in: {5 - seconds}s
        </div>
      </div>

      {/* Secret Interaction Area */}
      {!showDebug && (
        <div 
          className="absolute top-0 right-0 w-24 h-24 cursor-pointer" 
          onClick={handleSecretTap} 
        />
      )}

      {/* Development Debug Panel */}
      {showDebug && (
        <div className="absolute inset-x-0 bottom-0 bg-neutral-900 text-white p-8 rounded-t-[2.5rem] shadow-2xl border-t border-white/10 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-extrabold text-xl">DEV OVERRIDE</h2>
            <button 
              onClick={() => setShowDebug(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
            >✕</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(states).map((s) => (
              <button
                key={s}
                onClick={() => { setState(s); }}
                className={`py-4 rounded-2xl text-[10px] font-bold tracking-widest uppercase border border-white/5 transition-active active:scale-95 ${state === s ? 'bg-white text-black' : 'bg-white/5'}`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
          
          <p className="mt-6 text-center text-[10px] text-white/30 uppercase tracking-widest">
            Tap background to reset normally
          </p>
        </div>
      )}

      {/* Mobile-First UI Polish */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
    </div>
  );
}
