'use client';
import { useRouter } from 'next/navigation';

export default function PatientDashboard() {
  const router = useRouter();

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-public-sans pb-28">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Public+Sans:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0..1,0,24&display=swap');

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }

        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-public-sans { font-family: 'Public Sans', sans-serif; }
        
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      {/* TopAppBar */}
      {/* <header className="bg-white border-b border-slate-100 fixed top-0 w-full z-50 h-16 flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#003c90] pt-1">anchor</span>
          <h1 className="text-[#003c90] font-extrabold text-xl tracking-tight font-manrope">HealthSync</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/patient-app/sos')}
            className="bg-[#b40009] text-white px-4 py-1.5 rounded-full font-bold text-sm tracking-wider active:scale-95 transition-transform duration-150 shadow-lg shadow-[#b40009]/20">
            SOS
          </button>
        </div>
      </header> */}

      <main className="pt-24 px-5 max-w-screen-md mx-auto">
        {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-[12px] mb-[24px]">
          <button
            onClick={() => router.push('/patient-app/games')}
            className="flex flex-col items-center justify-center bg-white border border-[#d2e6ef] p-6 rounded-2xl hover:bg-slate-50 transition-colors active:scale-95 duration-150 text-[#003c90]">
            <span className="material-symbols-outlined text-4xl mb-2">sports_esports</span>
            <span className="text-[14px] leading-[20px] tracking-[0.02em] font-semibold">Game</span>
          </button>

          <button
            onClick={() => router.push('/patient-app/sos')}
            className="flex flex-col items-center justify-center bg-[#ffdad6] border border-[#ba1a1a]/10 p-6 rounded-2xl hover:bg-[#ffdad6]/80 transition-colors active:scale-95 duration-150 relative overflow-hidden text-[#ba1a1a]">
            <span className="material-symbols-outlined text-4xl mb-2 relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
            <span className="text-[14px] leading-[20px] tracking-[0.02em] font-semibold relative z-10">SOS</span>
          </button>

          <button
            onClick={() => router.push('/patient-app/heart-rate')}
            className="flex flex-col items-center justify-center bg-white border border-[#d2e6ef] p-6 rounded-2xl hover:bg-slate-50 transition-colors active:scale-95 duration-150 text-[#003c90]">
            <span className="material-symbols-outlined text-4xl mb-2">monitor_heart</span>
            <span className="text-[14px] leading-[20px] tracking-[0.02em] font-semibold text-center">Heart Rate Checker</span>
          </button>

          {/* <button className="flex flex-col items-center justify-center bg-white border border-[#d2e6ef] p-6 rounded-2xl hover:bg-slate-50 transition-colors active:scale-95 duration-150 text-[#003c90]">
            <span className="material-symbols-outlined text-4xl mb-2">anchor</span>
            <span className="text-[14px] leading-[20px] tracking-[0.02em] font-semibold">Anchor</span>
          </button> */}
        </div>

        {/* Current Vitals Summary */}
        <section className="mb-[24px]">
          <h2 className="text-[20px] leading-[28px] font-semibold font-manrope text-[#191c1e] mb-[16px]">Current Vitals</h2>
          <div className="grid grid-cols-4 grid-rows-2 gap-[12px] h-64">
            <div className="col-span-2 row-span-2 bg-white border border-[#d2e6ef] rounded-2xl p-[16px] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#003c90] mb-1">
                  <span className="material-symbols-outlined">favorite</span>
                  <span className="text-[12px] leading-[16px] tracking-[0.04em] font-semibold">Heart Rate</span>
                </div>
                <p className="text-[30px] leading-[38px] tracking-[-0.02em] font-bold font-manrope text-[#191c1e]">
                  72 <span className="text-[14px] leading-[20px] font-normal text-[#737784]">bpm</span>
                </p>
              </div>
              <div className="h-16 w-full bg-[#d9e2ff] rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#003c90] to-transparent"></div>
                <img className="w-full h-full object-cover mix-blend-multiply" alt="EKG line graph" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQgoTYP3osi-u2yVAblSXRFm1YAiCUH4gJCSx8Lxy95j_sUWkh3m_VPkJZ4MRO-8Q1cxpZ7AJiqeBoBtAkbqvhK88-_ug5genmVTqu9qcRfHA9RD3CQ5P4pLh5Yi8bugWf0_fuJOvTNlw8xdWurQdary3py18DhE_widyFnR1hXyhc-MS2lOv0-ANsoDv3uaHTTAFsMCIX8qSnfLI9yCj22NVmHXGrxVD3s62w-8Go5-YaToAw7gHeivP-btmmnR5l9NrBBkitJsWS" />
              </div>
            </div>

            <div className="col-span-2 bg-white border border-[#d2e6ef] rounded-2xl p-[16px] flex items-center justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#003c90] mb-1">
                  <span className="material-symbols-outlined">compress</span>
                  <span className="text-[12px] leading-[16px] tracking-[0.04em] font-semibold">Pressure</span>
                </div>
                <p className="text-[20px] leading-[28px] font-semibold font-manrope text-[#191c1e]">120/80</p>
              </div>
              <span className="material-symbols-outlined text-green-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>

            <div className="col-span-2 bg-white border border-[#d2e6ef] rounded-2xl p-[16px] flex items-center justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#003c90] mb-1">
                  <span className="material-symbols-outlined">water_drop</span>
                  <span className="text-[12px] leading-[16px] tracking-[0.04em] font-semibold">Oxygen</span>
                </div>
                <p className="text-[20px] leading-[28px] font-semibold font-manrope text-[#191c1e]">98%</p>
              </div>
              <span className="material-symbols-outlined text-green-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>
        </section>

        {/* Health Insights */}
        <section className="mb-[24px]">
          <h2 className="text-[20px] leading-[28px] font-semibold font-manrope text-[#191c1e] mb-[16px]">Health Insights</h2>
          <div className="bg-[#0f52ba] text-[#bcceff] p-6 rounded-2xl relative overflow-hidden shadow-xl shadow-[#0f52ba]/10">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-white">
                <span className="material-symbols-outlined">auto_awesome</span>
                <span className="text-[14px] leading-[20px] tracking-[0.02em] font-semibold">Daily Summary</span>
              </div>
              <h3 className="text-[24px] leading-[32px] tracking-[-0.01em] font-semibold font-manrope text-white mb-2">Your recovery is excellent today</h3>
              <p className="text-[16px] leading-[24px] font-normal text-blue-100 opacity-90">Based on your sleep quality and lower resting heart rate, today is a great day for moderate exercise.</p>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Wellness Tips */}
        <section className="mb-[24px]">
          <div className="flex justify-between items-end mb-[16px]">
            <h2 className="text-[20px] leading-[28px] font-semibold font-manrope text-[#191c1e]">Wellness Tips</h2>
            <button className="text-[#003c90] text-[14px] leading-[20px] tracking-[0.02em] font-semibold">View All</button>
          </div>

          <div className="flex gap-[12px] overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar flex-nowrap items-stretch">
            <div className="flex-none w-64 bg-white border border-[#d2e6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-32 bg-slate-100 flex-shrink-0">
                <img className="w-full h-full object-cover" alt="peaceful woman meditating" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9eIXOxymOVZqxs3ZKuCl9crTE-0wWo7AFCRBFL3fzJLLQOyToKiGVPHuw2zcDOn9L3qQj6y0I5UW_XM5nHK06C5tACDUmVFjOfqjjlzQP0sCmWNQ884wXVIcmO3up0nKZyyYB6iEii0mUjBO47W_VvBbJeTdC5fexBEGl634sg87cuJZwxsg9OdIyMU6H2Dd0_miK0woWfhP8vRibj2AeQyZUEFCST148uGJyU8QeurVA7E3dM9C7IjIUx4FHN5jMWtReflaiXlHs" />
              </div>
              <div className="p-[16px] flex flex-col justify-center flex-grow">
                <span className="text-[12px] leading-[16px] tracking-[0.04em] font-semibold text-[#003c90] mb-1 block">MINDFULNESS</span>
                <p className="text-[16px] leading-[24px] font-semibold text-[#191c1e] line-clamp-1">5-Minute Stress Reliever</p>
              </div>
            </div>

            <div className="flex-none w-64 bg-white border border-[#d2e6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-32 bg-slate-100 flex-shrink-0">
                <img className="w-full h-full object-cover" alt="healthy meal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWlzEQzKFUXQyOGpky4SgXpvZrkAUrOUHS3xAm3uy911MJ9nwT7Wdr-a7UbNxlbNymiHVEpPde6vRPwcYKf-JybDxgUXDRGpVeltBOydqqqmkY1zbLpL0RNjBfXRHANx5NLMFIJlLGZpn7EJecUUw8-9P1wXG14j0t29RBzvSlQWFgsMxfDcLB1sqanU6JPtDU9xP098MYPlBMo2KwvzUQs0qaxWSEKoKRv0wGypEm-wmqYUb3AOgU5F5ROHsagCvv5vsqCfzNSWrE" />
              </div>
              <div className="p-[16px] flex flex-col justify-center flex-grow">
                <span className="text-[12px] leading-[16px] tracking-[0.04em] font-semibold text-[#003c90] mb-1 block">NUTRITION</span>
                <p className="text-[16px] leading-[24px] font-semibold text-[#191c1e] line-clamp-1">Best Foods for Focus</p>
              </div>
            </div>

            <div className="flex-none w-64 bg-white border border-[#d2e6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-32 bg-slate-100 flex-shrink-0">
                <img className="w-full h-full object-cover" alt="modern bedroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlNHQBxcmqvjELiDjQkRIslwGEOtmcxaWXeslJ8A7C2iUtlLUMDg4XVy_Svaqs5AuFgVRfKRUXpAQe3krYKr0u0hP4Yogs4DZVrLDzcqb57b1yXPgJalXq25hz3xA6KhzE1Y-W0EiDJpV2pg1OltXcrec_qEQ691V9Z8Vn12tFrfI4nOFlLdl0U9AI2JJoziMrRdpBrJw9Moc8FY5uOv5mHJNqHNORIG4_HefDF7cE57phQbXQvOU1eB42eJk4Y29rIKvMH7DN32kc" />
              </div>
              <div className="p-[16px] flex flex-col justify-center flex-grow">
                <span className="text-[12px] leading-[16px] tracking-[0.04em] font-semibold text-[#003c90] mb-1 block">SLEEP</span>
                <p className="text-[16px] leading-[24px] font-semibold text-[#191c1e] line-clamp-1">Optimizing Your Routine</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 pb-safe bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(15,82,186,0.05)] rounded-t-2xl text-[#191c1e]">
        <button className="flex flex-col items-center justify-center text-[#003c90] bg-[#e1f5fe]/80 rounded-xl px-4 py-1 active:scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-manrope text-[11px] font-medium mt-1 text-[#003c90]">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#737784] hover:text-[#0f52ba] active:scale-90 transition-transform">
          <span className="material-symbols-outlined">monitor_heart</span>
          <span className="font-manrope text-[11px] font-medium mt-1">Vitals</span>
        </button>
        <button
          onClick={() => router.push('/patient-app/games')}
          className="flex flex-col items-center justify-center text-[#737784] hover:text-[#0f52ba] active:scale-90 transition-transform">
          <span className="material-symbols-outlined">sports_esports</span>
          <span className="font-manrope text-[11px] font-medium mt-1">Games</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#737784] hover:text-[#0f52ba] active:scale-90 transition-transform">
          <span className="material-symbols-outlined">person</span>
          <span className="font-manrope text-[11px] font-medium mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
