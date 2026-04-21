'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Zap } from 'lucide-react';

export default function CCTVPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time for the CCTV overlay
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Camera access denied or unavailable.");
      }
    }
    
    startCamera();

    return () => {
      // Cleanup stream when unmounting
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex items-center justify-center relative font-mono text-white select-none">
      {error ? (
        <div className="flex flex-col items-center gap-2 text-red-500 opacity-80">
          <Camera className="w-12 h-12 mb-2" />
          <p className="text-sm tracking-widest uppercase">Feed Offline</p>
          <p className="text-xs text-white/50">{error}</p>
        </div>
      ) : (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover opacity-90"
        />
      )}
      
      {/* CCTV Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 drop-shadow-md">
         <div className="flex items-center gap-2">
           <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse border border-red-400"></div>
           <span className="text-red-500 font-bold tracking-widest text-sm drop-shadow">REC</span>
         </div>
         <span className="text-xs font-bold text-white/80 tracking-wider">CAM-01 / LIVING ROOM</span>
      </div>

      <div className="absolute top-4 right-4 text-xs font-bold text-white/90 tracking-widest text-right z-10 drop-shadow-md">
        <div>{time.toLocaleDateString()}</div>
        <div>{time.toLocaleTimeString()}</div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/60 text-[10px] tracking-widest z-10">
        <Zap className="w-3 h-3 text-teal-400" />
        ACTIVE MONITORING
      </div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
    </div>
  );
}
