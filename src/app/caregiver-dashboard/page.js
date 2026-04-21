"use client";

import { useEffect, useState, useRef } from "react";
import { listenToStatus, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Shield, ShieldAlert, Lock, Unlock, User, Activity, Clock, Bell } from "lucide-react";

/**
 * Caregiver Dashboard Component
 * 
 * Features:
 * - Real-time patient monitoring via Firebase
 * - Critical alert visualization (flashing red screen, emergency banner)
 * - Remote door unlocking control
 * - Minimal, premium "Apple-style" aesthetics
 */
export default function CaregiverDashboard() {
  const [patient, setPatient] = useState({
    patientId: "Loading...",
    status: "IDLE",
    lastActive: null,
    emergencyLock: "locked",
  });
  const [isMounting, setIsMounting] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsMounting(false);
    // Attach Firebase listener
    const unsubscribe = listenToStatus((data) => {
      setPatient(data);
    });
    return () => unsubscribe();
  }, []);

  const isEmergency = patient?.status === "CRITICAL_ALERT";

  // Handle emergency audio triggers
  useEffect(() => {
    if (isEmergency) {
      const playAlert = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            // Browsers often block auto-play until user interaction
            console.log("Audio playback blocked: waiting for user interaction");
          });
        }
      };
      
      // Play immediately and loop
      playAlert();
      const interval = setInterval(playAlert, 3000);
      return () => clearInterval(interval);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isEmergency]);

  const handleUnlock = async () => {
    if (!patient?.patientId || patient.patientId === "Loading...") return;
    try {
      const docRef = doc(db, "patients", patient.patientId);
      await updateDoc(docRef, {
        emergencyLock: "unlocked"
      });
    } catch (error) {
      console.error("Failed to unlock door:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CRITICAL_ALERT": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "MONITORING": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "AWAITING_VOICE": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      default: return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (isMounting) return null;

  return (
    <div className={`min-h-screen transition-all duration-700 flex flex-col items-center justify-center font-sans overflow-hidden ${
      isEmergency ? "bg-red-950/40 animate-[pulse_1.5s_infinite]" : "bg-black"
    }`}>
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" 
        loop 
      />

      {/* Emergency Top Banner */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 transform ${
        isEmergency ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="bg-red-600 text-white flex items-center justify-center py-3 px-6 shadow-2xl space-x-4">
          <ShieldAlert className="w-6 h-6 animate-bounce" />
          <span className="text-lg font-bold tracking-[0.2em] uppercase">Emergency Response Required</span>
          <ShieldAlert className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Background Orbs for Premium Look */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000 ${
          isEmergency ? "bg-red-600/20" : "bg-blue-600/10"
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000 ${
          isEmergency ? "bg-orange-600/20" : "bg-indigo-600/10"
        }`} />
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10 w-full max-w-xl px-4">
        {/* Header Branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-zinc-500 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium tracking-widest uppercase">Sentinel Network</span>
          </div>
          <h1 className="text-4xl font-light text-white tracking-tight">Caregiver Dashboard</h1>
        </div>

        {/* Center Panel */}
        <div className={`
          backdrop-blur-3xl border rounded-[32px] p-8 transition-all duration-500
          ${isEmergency 
            ? "bg-red-950/40 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]" 
            : "bg-zinc-900/40 border-white/10 shadow-2xl"}
        `}>
          <div className="space-y-10">
            {/* Patient ID */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-zinc-800 rounded-2xl border border-white/5">
                  <User className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Subject Identity</p>
                  <p className="text-xl font-medium text-zinc-100">{patient?.patientId}</p>
                </div>
              </div>
              {isEmergency && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="text-red-400 text-xs font-bold uppercase">Critical</span>
                </div>
              )}
            </div>

            {/* Status Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider flex items-center">
                  <Activity className="w-3 h-3 mr-2" /> Live Status
                </p>
                <div className={`px-4 py-3 rounded-2xl border font-medium text-sm inline-block transition-colors duration-500 ${getStatusColor(patient?.status)}`}>
                  {patient?.status.replace("_", " ")}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider flex items-center">
                  <Clock className="w-3 h-3 mr-2" /> Sync Time
                </p>
                <p className="text-xl font-medium text-zinc-100">
                  {formatTime(patient?.lastActive)}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="pt-6 border-t border-white/5">
              <button
                onClick={handleUnlock}
                disabled={patient?.emergencyLock === "unlocked"}
                className={`
                  w-full py-5 rounded-[20px] font-semibold text-lg flex items-center justify-center space-x-3 transition-all active:scale-[0.98]
                  ${patient?.emergencyLock === "unlocked"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default"
                    : isEmergency
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/5"}
                `}
              >
                {patient?.emergencyLock === "unlocked" ? (
                  <>
                    <Unlock className="w-6 h-6" />
                    <span>Access Granted</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    <span>Unlock Door</span>
                  </>
                )}
              </button>
              <p className="text-center text-zinc-600 text-[10px] mt-4 uppercase tracking-[0.2em]">
                Remote Entry Authorization • Secured Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex flex-col items-center space-y-4">
           <div className="flex items-center space-x-6 text-zinc-500">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-xs">Database Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isEmergency ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className="text-xs">Sensor Relay Active</span>
              </div>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { background-color: rgba(69, 10, 10, 0.4); }
          50% { background-color: rgba(127, 29, 29, 0.6); }
        }
      `}</style>
    </div>
  );
}
