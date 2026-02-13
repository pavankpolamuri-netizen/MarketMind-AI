
import React, { useState } from 'react';
import { getCrossPlatformInsights } from '../services/geminiService';
import { SocialInsight } from '../types';

const PlatformPage: React.FC = () => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<SocialInsight[] | null>(null);

  const platforms = [
    { name: 'YouTube', color: 'from-red-600 to-rose-600', icon: '📹' },
    { name: 'Instagram', color: 'from-pink-600 to-orange-500', icon: '📸' },
    { name: 'Twitter (X)', color: 'from-sky-500 to-blue-600', icon: '🐦' },
    { name: 'TikTok', color: 'from-slate-800 to-slate-900', icon: '🎵' },
    { name: 'LinkedIn', color: 'from-blue-700 to-indigo-800', icon: '💼' }
  ];

  const handleFetchInsights = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    try {
      const data = await getCrossPlatformInsights(product);
      setInsights(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze social channels.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
          Social Hub
        </div>
        <h2 className="text-4xl font-extrabold text-white leading-tight">
          Social Platforms
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Master your presence across YouTube, Instagram, X, and TikTok with platform-specific AI intelligence.
        </p>
      </header>

      {/* Platform Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {platforms.map((p, i) => (
          <div key={i} className={`p-6 rounded-3xl bg-gradient-to-br ${p.color} border border-white/10 shadow-xl shadow-black/20 group cursor-default hover:scale-105 transition-all`}>
            <div className="text-4xl mb-4 drop-shadow-lg">{p.icon}</div>
            <div className="text-lg font-black text-white">{p.name}</div>
            <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">Intelligence Ready</div>
          </div>
        ))}
      </div>

      <div className="glass p-10 rounded-[3rem] border border-white/5 bg-slate-900/40">
        <h3 className="text-2xl font-bold text-white mb-6">Cross-Channel Strategy Analysis</h3>
        <form onSubmit={handleFetchInsights} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter your product (e.g. AI Fitness Coach)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <button
            disabled={loading}
            className={`px-10 py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 ${
              loading ? 'bg-indigo-900/50 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 shadow-lg shadow-indigo-600/20'
            }`}
          >
            {loading ? 'Analyzing Channels...' : 'Extract Mastery Tips'}
          </button>
        </form>

        {insights && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-6">
            {insights.map((insight, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <span className="text-6xl font-black italic">{i + 1}</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                  {insight.platform}
                </h4>
                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Winning Strategy</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{insight.strategy}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Peak Time</div>
                      <div className="text-indigo-400 font-bold text-sm">{insight.bestTime}</div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Prime Format</div>
                      <div className="text-cyan-400 font-bold text-sm">{insight.contentFormat}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 w-fit">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Expected Reach: {insight.expectedReach}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!insights && !loading && (
          <div className="mt-12 text-center py-20 border-2 border-dashed border-slate-700 rounded-3xl">
             <div className="text-5xl mb-4">🛸</div>
             <p className="text-slate-500 font-medium">Input your product to unlock platform-specific growth hacks.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformPage;
