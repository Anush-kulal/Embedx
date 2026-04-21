"use client";

import { Activity, Bell, Home, LockOpen, Settings, ShieldAlert, ShieldCheck, User } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-900/50 border-r border-zinc-800/50 flex flex-col backdrop-blur-md">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <span className="text-zinc-100 font-semibold tracking-tight">Project Sentinel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/80 text-zinc-100 transition-colors border border-zinc-700/50">
            <Home className="w-5 h-5 opacity-70" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 transition-colors">
            <User className="w-5 h-5 opacity-70" />
            <span className="font-medium">Patients</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 transition-colors">
            <Activity className="w-5 h-5 opacity-70" />
            <span className="font-medium">Activity Logs</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 transition-colors">
            <Settings className="w-5 h-5 opacity-70" />
            <span className="font-medium">Settings</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/50 text-zinc-400">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-300 text-xs font-bold">CG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Caregiver</span>
              <span className="text-xs text-zinc-500">Active duty</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-zinc-900/30 border-b border-zinc-800/50 backdrop-blur-md">
          <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">Overview</h1>
          <button className="relative w-10 h-10 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-zinc-900"></span>
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto h-full place-content-start">
            
            {/* Central Panel - Patient Status */}
            <div className="xl:col-span-2 space-y-6">
              <section className="bg-zinc-900/40 rounded-3xl border border-zinc-800/50 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                
                <h2 className="text-lg font-medium text-zinc-400 mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Patient Status (Live)
                </h2>
                
                <div className="flex items-start gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-zinc-50 mb-2">John Doe is Safe</h3>
                    <p className="text-zinc-400 mb-6">Last activity detected 2 minutes ago in the Living Room.</p>
                    
                    <div className="flex gap-4">
                      <div className="px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <span className="block text-xs text-zinc-500 mb-1">Heart Rate</span>
                        <span className="text-lg font-medium text-zinc-200">72 bpm</span>
                      </div>
                      <div className="px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <span className="block text-xs text-zinc-500 mb-1">Room Temp</span>
                        <span className="text-lg font-medium text-zinc-200">71°F</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Activity Timeline (Mock) */}
              <section className="bg-zinc-900/40 rounded-3xl border border-zinc-800/50 p-8 backdrop-blur-xl">
                <h2 className="text-lg font-medium text-zinc-400 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { time: "10:42 AM", event: "Motion detected in Kitchen" },
                    { time: "09:15 AM", event: "Front Door was closed" },
                    { time: "08:30 AM", event: "Patient woke up" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm">
                      <span className="text-zinc-500 w-20">{log.time}</span>
                      <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                      <span className="text-zinc-300">{log.event}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Side Widget - Emergency Actions */}
            <div className="space-y-6">
              <section className="bg-zinc-900/40 rounded-3xl border border-zinc-800/50 p-6 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500/50 to-amber-500/50"></div>
                <h2 className="text-lg font-medium text-zinc-100 mb-6 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  Emergency Actions
                </h2>
                
                <div className="space-y-4">
                  <button className="w-full relative group overflow-hidden rounded-2xl bg-red-950/20 border border-red-900/50 p-4 transition-all hover:bg-red-950/40 hover:border-red-500/50 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]">
                    <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                      <LockOpen className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                      <span className="text-red-500 font-semibold tracking-tight">Override Smart Lock</span>
                      <span className="text-xs text-red-400/70 text-center">Instantly unlocks the front door for emergency responders.</span>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 rounded-2xl bg-amber-950/10 border border-amber-900/30 p-4 transition-all hover:bg-amber-950/30 hover:border-amber-500/40">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="block text-zinc-200 font-medium tracking-tight">Trigger Ambience</span>
                      <span className="block text-xs text-zinc-500">Flash amber lights</span>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 rounded-2xl bg-zinc-800/20 border border-zinc-700/30 p-4 transition-all hover:bg-zinc-800/50">
                    <div className="w-10 h-10 rounded-full bg-zinc-700/50 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="block text-zinc-200 font-medium tracking-tight">Dispatch Medical</span>
                      <span className="block text-xs text-zinc-500">Call designated emergency contact</span>
                    </div>
                  </button>
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
