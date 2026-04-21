'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

// Configuration for Multi-User Modes
const MODES = {
  ELDER: {
    name: 'Elderly',
    icon: '👴',
    timeout: 10,
    messages: {
      IDLE: 'Monitoring health and safety...',
      INACTIVE_WARNING: 'Are you feeling okay?',
      AWAITING_VOICE: 'Listening for your voice...',
      CRITICAL_ALERT: 'EMERGENCY DISPATCHED'
    }
  },
  CHILD: {
    name: 'Child',
    icon: '👶',
    timeout: 4,
    messages: {
      IDLE: 'Safety supervision active!',
      INACTIVE_WARNING: 'Hey! Are you okay? 😊',
      AWAITING_VOICE: 'Please say something!',
      CRITICAL_ALERT: 'SAFETY ALERT SENT'
    }
  }
};

/**
 * usePatientState Hook
 */
function usePatientState(timeout) {
  const [state, setState] = useState('IDLE');
  const [seconds, setSeconds] = useState(0);

  const reset = useCallback(() => {
    setState('IDLE');
    setSeconds(0);
  }, []);

  useEffect(() => {
    if (state === 'CRITICAL_ALERT') return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        if (next >= timeout) {
          if (state === 'IDLE') setState('INACTIVE_WARNING');
          else if (state === 'INACTIVE_WARNING') setState('AWAITING_VOICE');
          else if (state === 'AWAITING_VOICE') setState('CRITICAL_ALERT');
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, timeout]);

  return { state, setState, reset, seconds };
}

export default function PatientApp() {
  const [userMode, setUserMode] = useState('ELDER');
  const currentMode = MODES[userMode];
  
  const { state, setState, reset, seconds } = usePatientState(currentMode.timeout);
  const [tapCount, setTapCount] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const recognitionRef = useRef(null);

  // TWILIO / FIREBASE INTEGRATION POINT
  const triggerSOS = useCallback(() => {
    console.log(`[EXTERNAL] Dispatching Emergency for ${userMode} Mode.`);
    // Future: Firebase.updateDoc(patientRef, { status: 'CRITICAL' })
  }, [userMode]);

  useEffect(() => {
    // Broadcast status to dashboard for real-time demo
    localStorage.setItem('sentinel_status', JSON.stringify({
      state,
      mode: userMode,
      timestamp: Date.now()
    }));

    if (state === 'CRITICAL_ALERT') triggerSOS();
  }, [state, userMode, triggerSOS]);

  // WEB SPEECH API INTEGRATION (Voice Reset)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (state === 'AWAITING_VOICE') {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        console.log("Speech detected! Resetting system.");
        reset();
      };

      recognition.onerror = (err) => console.error("Speech Error:", err);
      
      try {
        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.log("Recognition already started");
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [state, reset]);

  const handleSecretTap = (e) => {
    e.stopPropagation();
    const currentCount = tapCount + 1;
    if (currentCount >= 5) {
      setShowDebug(true);
      setTapCount(0);
    } else {
      setTapCount(currentCount);
    }
  };

  const states = {
    IDLE: { color: 'bg-emerald-500', label: 'SYSTEM IDLE' },
    INACTIVE_WARNING: { color: 'bg-amber-400', label: 'WARNING' },
    AWAITING_VOICE: { color: 'bg-sky-500', label: 'VOICE AUTH' },
    CRITICAL_ALERT: { color: 'bg-rose-600 animate-pulse', label: 'CRITICAL' }
  };

  const ui = states[state];

  return (
    <div 
      className={`h-screen w-full flex flex-col items-center justify-center p-6 transition-all duration-700 ${ui.color}`}
      onClick={() => !showDebug && reset()}
    >
      <div className="absolute top-16 z-10 flex bg-white/10 p-1 rounded-full backdrop-blur-md border border-white/10" onClick={(e) => e.stopPropagation()}>
        {Object.keys(MODES).map((m) => (
          <button
            key={m}
            onClick={() => { setUserMode(m); reset(); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-xs font-bold uppercase tracking-wider ${userMode === m ? 'bg-white text-black shadow-lg scale-105' : 'text-white/60 hover:text-white'}`}
          >
            <span>{MODES[m].icon}</span>
            <span>{MODES[m].name}</span>
          </button>
        ))}
      </div>

      <div className="text-center select-none mt-[-100px]">
        <div className="mb-4 inline-block px-4 py-1 rounded-full bg-black/10 text-white text-[10px] font-black tracking-widest uppercase">
          {ui.label}
        </div>
        <h1 className="text-5xl font-black text-white mb-4 drop-shadow-sm leading-tight max-w-xs mx-auto">
          {currentMode.messages[state]}
        </h1>
        <p className="text-white/60 text-sm font-mono tracking-tighter">
          {state === 'AWAITING_VOICE' ? 'Checking for your response...' : 
           state !== 'CRITICAL_ALERT' ? `Active Monitoring: ${currentMode.timeout - seconds}s` : 'EMERGENCY TRIGGERED'}
        </p>
      </div>

      {state === 'AWAITING_VOICE' && (
        <div className="absolute top-[60%] flex gap-2">
          <div className="w-2 h-8 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-12 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-8 bg-white/40 rounded-full animate-bounce" />
        </div>
      )}

      <button 
        onClick={(e) => { e.stopPropagation(); setState('CRITICAL_ALERT'); }}
        className="absolute bottom-20 w-40 h-40 bg-white text-rose-600 rounded-full shadow-[0_0_60px_rgba(225,29,72,0.4)] flex flex-col items-center justify-center border-[12px] border-rose-600/10 active:scale-95 transition-all z-20"
      >
        <span className="text-4xl font-black tracking-tighter">SOS</span>
        <span className="text-[10px] font-bold uppercase opacity-40 mt-[-4px]">Instant Help</span>
        <div className="absolute inset-0 rounded-full animate-ping bg-rose-600/10 pointer-events-none" />
      </button>

      <div className="absolute top-0 right-0 w-20 h-20 z-30 opacity-0" onClick={handleSecretTap} />

      {showDebug && (
        <div className="absolute inset-x-0 bottom-0 z-50 bg-neutral-900 text-white p-8 rounded-t-[2.5rem] shadow-2xl border-t border-white/20" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-extrabold text-xl">DEBUG MODE</h2>
            <button onClick={() => setShowDebug(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(states).map((s) => (
              <button key={s} onClick={() => setState(s)} className={`py-4 rounded-2xl text-[10px] font-bold tracking-widest uppercase border border-white/5 ${state === s ? 'bg-white text-black' : 'bg-white/5'}`}>
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[9px] text-white/30 text-center uppercase tracking-widest font-bold">Web Speech API Supported</p>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full" />
    </div>
  );
}
