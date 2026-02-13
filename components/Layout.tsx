
import React from 'react';
import { AppView, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, user, onLogout }) => {
  const isAdmin = user.role === 'Chief Strategist' || user.username === 'admin';

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Overview', icon: '📊' },
    { id: AppView.MARKET_INSIGHTS, label: 'Market Ratios', icon: '📈' },
    { id: AppView.PLATFORM, label: 'Social Channels', icon: '📱' },
    { id: AppView.CAMPAIGN, label: 'Campaign Engine', icon: '🚀' },
    { id: AppView.PITCH, label: 'Pitch Creator', icon: '🎤' },
    { id: AppView.LEAD_SCORE, label: 'Lead Scorer', icon: '🎯' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-72 glass md:h-screen p-6 flex flex-col fixed md:relative z-40">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => setView(AppView.DASHBOARD)}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">M</div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full border border-[#1e293b]"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            MarketMind AI
          </h1>
        </div>
        
        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                currentView === item.id 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner shadow-indigo-500/10' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-sm font-bold border border-slate-600">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-white truncate">{user.username}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{user.role}</div>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full py-2 bg-slate-700/50 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-lg text-xs font-bold transition-all"
            >
              Terminate Session
            </button>
          </div>
          <div className="text-xs text-slate-500 uppercase font-semibold mb-2 tracking-widest px-2">Core Neural Engine</div>
          <div className="flex items-center gap-2 text-indigo-300 font-medium px-2 text-sm">
            Gemini 3 Pro
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="h-16 px-6 md:px-10 flex items-center justify-end border-b border-white/5 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-30 gap-3">
           {/* New Social Channels Quick Access Button */}
           <button 
             onClick={() => setView(AppView.PLATFORM)}
             className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
               currentView === AppView.PLATFORM
               ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
               : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5'
             }`}
           >
             <span className="text-lg leading-none">📱</span>
             Social Hub
           </button>

           {isAdmin && (
             <button 
               onClick={() => setView(AppView.ADMIN)}
               className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                 currentView === AppView.ADMIN
                 ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                 : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5'
               }`}
             >
               <span className="text-lg leading-none">🔐</span>
               Admin Terminal
             </button>
           )}
        </header>

        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
