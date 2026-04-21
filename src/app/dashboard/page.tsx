"use client";

import { useState, useEffect } from "react";
import { Activity, Bell, Calendar, Home, LockOpen, MessageSquare, HelpCircle, Settings, ShieldAlert, ShieldCheck, User, AlertTriangle, ScanLine, DoorClosed, Thermometer, HeartPulse, Zap } from "lucide-react";

export default function DashboardPage() {
  const [status, setStatus] = useState({ state: 'IDLE', mode: 'ELDER' });

  useEffect(() => {
    const checkStatus = () => {
      const data = localStorage.getItem('sentinel_status');
      if (data) {
        setStatus(JSON.parse(data));
      }
    };

    checkStatus();
    window.addEventListener('storage', checkStatus);
    const interval = setInterval(checkStatus, 1000); // Polling as fallback for same-tab/window behavior
    return () => {
      window.removeEventListener('storage', checkStatus);
      clearInterval(interval);
    };
  }, []);

  const getStatusText = () => {
    if (status.state === 'CRITICAL_ALERT') return 'EMERGENCY: SOS Triggered!';
    if (status.state === 'INACTIVE_WARNING' || status.state === 'AWAITING_VOICE') return 'Warning: Inactivity Detected';
    return 'Patient is Safe';
  };

  const isPanic = status.state === 'CRITICAL_ALERT';
  const isAmber = status.mode === 'THERAPEUTIC';
  const isUnlocked = status.state === 'UNLOCKED';

  const handleUnlock = async () => {
    try {
      await fetch('/api/unlock-door', { method: 'POST' });
      const newStatus = { ...status, state: 'UNLOCKED' };
      setStatus(newStatus);
      localStorage.setItem('sentinel_status', JSON.stringify(newStatus));
      console.log("Unlock door completed");
    } catch (e) {
      console.error("Failed to unlock door", e);
    }
  };

  const handleTriggerAmbience = async () => {
    // Implement local storage or API update for ambience
    console.log("Trigger ambience requested");
  };

  const handleDispatchMedical = async () => {
    console.log("Dispatch medical requested");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-slate-800">

      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1 font-bold text-xl tracking-tight">
            <span className="text-teal-600">Aura</span>
            <span className="text-slate-700">Care</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-teal-600">Dashboard</a>
            <a href="#" className="text-slate-500 hover:text-slate-800">Patients</a>
            <a href="#" className="text-slate-500 hover:text-slate-800">Schedule</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            {isPanic && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></span>}
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-teal-600 border-2 border-teal-100 flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white flex flex-col pt-6">
          <nav className="flex-1 px-4 flex flex-col gap-1.5">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-50 text-teal-700 font-medium">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium">
              <User className="w-5 h-5" />
              <span>Patients</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium">
              <Calendar className="w-5 h-5" />
              <span>Schedule</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium">
              <Activity className="w-5 h-5" />
              <span>Activity Logs</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          <div className="p-4">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D92D20] text-white font-medium hover:bg-red-700 transition-colors shadow-sm">
              <ShieldAlert className="w-4 h-4" />
              Emergency Alert
            </button>
          </div>

          <div className="p-4 pt-0">
            <div className="flex flex-col gap-3 px-4 py-4 mt-2">
              <a href="#" className="flex items-center gap-3 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
                Help Center
              </a>
              <a href="#" className="flex items-center gap-3 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                <DoorClosed className="w-4 h-4" />
                Sign Out
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 border-l border-slate-200">
          <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto items-start">

            {/* Left Column - Central Panel & Activity */}
            <div className="flex-1 space-y-8 w-full xl:w-auto">

              {/* Patient Status Card */}
              <section className={`rounded-3xl bg-white p-8 shadow-sm border-[3px] transition-colors duration-500 ${isPanic ? 'border-red-100' : 'border-white'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-slate-500">
                    <span className={`w-2 h-2 rounded-full ${isPanic ? 'bg-red-500 animate-pulse' : isAmber ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                    Patient Status (Live)
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600 uppercase tracking-wide">Mode: {status.mode}</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-white ${isPanic ? 'bg-[#B42318]' : 'bg-emerald-600'}`}>
                      STATUS: {status.state}
                    </span>
                  </div>
                </div>

                <h2 className={`text-4xl font-bold tracking-tight mb-8 ${isPanic ? 'text-slate-900' : 'text-slate-800'}`}>
                  {getStatusText()}
                </h2>

                <div className="flex gap-4">
                  <div className="flex-1 bg-red-50 rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0 z-10">
                      <HeartPulse className="w-6 h-6 text-[#D92D20]" />
                    </div>
                    <div className="z-10">
                      <span className="block text-sm font-medium text-slate-500 mb-0.5">Heart Rate</span>
                      <span className="block text-2xl font-bold text-[#B42318]">{isPanic ? '142 bpm' : '72 bpm'}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-teal-50/50 rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0 z-10">
                      <Thermometer className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="z-10">
                      <span className="block text-sm font-medium text-slate-500 mb-0.5">Room Temp</span>
                      <span className="block text-2xl font-bold text-slate-800">71°F</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Activity & Feeds */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
                  <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">View Full History →</a>
                </div>

                <div className="space-y-4">
                  {(isPanic ? [{ type: 'panic', title: 'Panic state triggered', detail: 'Main Bedroom - Wearable Device', time: '2m ago' }] : []).concat([
                    { type: 'motion', title: 'Motion detected in Kitchen', detail: 'Standard morning routine deviation detected', time: '14m ago' },
                    { type: 'door', title: 'Front Door was closed', detail: 'Secure lock confirmed', time: '45m ago' }
                  ]).map((log, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                        ${log.type === 'panic' ? 'bg-red-50 text-red-500' :
                          log.type === 'motion' ? 'bg-teal-50 text-teal-600' :
                            'bg-slate-100 text-slate-400'}`}>
                        {log.type === 'panic' && <AlertTriangle className="w-5 h-5" />}
                        {log.type === 'motion' && <ScanLine className="w-5 h-5" />}
                        {log.type === 'door' && <DoorClosed className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-slate-800">{log.title}</h4>
                        <p className="text-sm text-slate-500">{log.detail}</p>
                      </div>
                      <span className="text-sm text-slate-400 font-medium whitespace-nowrap">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row - Video Feed & Note */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-3 h-2 rounded-[2px] bg-slate-400 uppercase"></span>
                    Living Room Feed
                  </h3>
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                    <iframe 
                      src="/cctv" 
                      allow="camera" 
                      className="w-full h-full border-0 pointer-events-none" 
                      title="Simulated CCTV Feed"
                    />
                  </div>
                </div>
                <div className="flex-1 bg-[#F0F9FF] rounded-3xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-teal-600 font-semibold mb-3">Caregiver Note</h3>
                  <p className="text-slate-600 text-sm italic leading-relaxed flex-1">
                    "Patient reported mild dizziness during breakfast. Monitoring heart rate closely for the next 2 hours."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-teal-600 border border-teal-200 flex items-center justify-center overflow-hidden">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">Dr. Sarah Mitchell</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Side Widget */}
            <div className="w-full xl:w-[320px] shrink-0 space-y-6">

              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-[#D92D20]"><Zap className="w-6 h-6 fill-current" /></span>
                  Emergency <br /> Actions
                </h2>

                <div className="space-y-3">
                  <button onClick={handleUnlock} className="w-full text-left rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors p-4 flex gap-4 items-center group">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <LockOpen className={`w-5 h-5 ${isUnlocked ? 'text-green-500' : 'text-teal-600'}`} />
                    </div>
                    <div>
                      <span className="block text-[15px] font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                        {isUnlocked ? "Door Unlocked" : "Override Smart Lock"}
                      </span>
                      <span className="block text-[13px] text-slate-500 mt-0.5 leading-snug">Grant entry for first responders</span>
                    </div>
                  </button>

                  <button onClick={handleTriggerAmbience} className="w-full text-left rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors p-4 flex gap-4 items-center group">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <span className="block text-[15px] font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">Trigger Ambience</span>
                      <span className="block text-[13px] text-slate-500 mt-0.5 leading-snug">Activate soothing lights & sound</span>
                    </div>
                  </button>

                  <button onClick={handleDispatchMedical} className="w-full text-left rounded-2xl bg-red-50 hover:bg-red-100 transition-colors p-4 flex gap-4 items-center group">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <HeartPulse className="w-5 h-5 text-[#D92D20]" />
                    </div>
                    <div>
                      <span className="block text-[15px] font-semibold text-slate-800 group-hover:text-[#D92D20] transition-colors">Dispatch Medical</span>
                      <span className="block text-[13px] text-slate-500 mt-0.5 leading-snug">Immediate ambulance request</span>
                    </div>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">Patient Location</h3>
                  <div className="bg-slate-200 rounded-2xl h-48 overflow-hidden relative shadow-inner mb-4">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map Location" className="w-full h-full object-cover" />
                    {/* Overlay pin centered */}
                    <div className="absolute inset-0 flex items-center justify-center drop-shadow-lg">
                      <div className="w-12 h-12 bg-[#D92D20] rounded-t-full rounded-bl-full rotate-45 flex items-center justify-center border-4 border-white shadow-md">
                        <User className="w-5 h-5 text-white -rotate-45" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start px-1">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 leading-tight">
                      124 Oak Haven Lane, Suite 402<br />
                      <span className="text-slate-500 text-xs font-normal">Palo Alto, CA 94301</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

