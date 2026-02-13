
import React, { useState } from 'react';
import { getMarketInsights } from '../services/geminiService';
import { MarketInsightsResult } from '../types';

const MarketInsights: React.FC = () => {
  const [sales, setSales] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarketInsightsResult | null>(null);

  // Sanitization for currency and numbers
  const sanitize = (val: string) => val.replace(/[^0-9.]/g, '');
  const parseAmount = (val: string) => parseFloat(sanitize(val)) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const sVal = parseAmount(sales);
    const mVal = parseAmount(marketSize);
    const cCount = parseAmount(competitors) || 1;
    
    // Explicit mathematical calculation for Market Share Ratio
    // Revenue / Total Market * 100
    const calculatedShare = mVal > 0 ? (sVal / mVal) * 100 : 0;
    // Market Capture Index (Share per Competitor)
    const captureFactor = calculatedShare / cCount;

    try {
      // Pass the raw numbers and calculated share to Gemini for interpretation
      const data = await getMarketInsights(sales, marketSize, competitors, calculatedShare);
      
      setResult({
        ...data,
        marketShare: parseFloat(calculatedShare.toFixed(2)) // Force precision
      });
    } catch (err) {
      console.error(err);
      alert('Analysis failed. Ensure valid data entries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Market Intelligence Center</h2>
        <p className="text-slate-400">Precision ratio analysis of revenue performance versus total sector potential.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6 sticky top-10 border border-white/10 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue (Targeted Unit)</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold">$</span>
                <input
                  type="text"
                  required
                  value={sales}
                  onChange={(e) => setSales(e.target.value)}
                  placeholder="5,000,000"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-8 pr-4 py-3.5 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Market Potential</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold">$</span>
                <input
                  type="text"
                  required
                  value={marketSize}
                  onChange={(e) => setMarketSize(e.target.value)}
                  placeholder="100,000,000"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-8 pr-4 py-3.5 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Competitors</label>
              <input
                type="text"
                required
                value={competitors}
                onChange={(e) => setCompetitors(sanitize(e.target.value))}
                placeholder="12"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
            </div>
            <button
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
                loading ? 'bg-cyan-900/50 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 shadow-xl shadow-cyan-600/30'
              }`}
            >
              {loading ? 'Synthesizing...' : 'Calculate Performance Ratio'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-8">
          {result ? (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-10 rounded-3xl border-b-4 border-cyan-500 shadow-xl bg-gradient-to-br from-cyan-500/5 to-transparent">
                  <div className="text-6xl font-black text-white mb-2 tracking-tighter tabular-nums">
                    {result.marketShare}%
                  </div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Market Share Ratio</div>
                </div>
                <div className="glass p-10 rounded-3xl border-b-4 border-violet-500 shadow-xl bg-gradient-to-br from-violet-500/5 to-transparent">
                  <div className="text-2xl font-bold text-white mb-2 leading-tight">{result.competitivePosition}</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Competitive Tier</div>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl bg-indigo-500/5 border-l-4 border-indigo-500 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4">Penetration Intelligence</h3>
                <p className="text-slate-300 leading-relaxed italic text-lg">
                  "{result.penetrationRatio}"
                </p>
              </div>

              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6">High-Yield Growth Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.growthOpportunities.map((opp, i) => (
                    <div key={i} className="bg-slate-800/40 p-6 rounded-2xl border border-white/5 group hover:bg-indigo-600/10 hover:border-indigo-500/20 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4 shadow-inner">
                        {i + 1}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium">{opp}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-2xl shrink-0">⚠️</div>
                <div>
                  <h3 className="text-rose-400 font-bold mb-1 uppercase tracking-wider text-sm">Strategic Critical Risk</h3>
                  <p className="text-rose-100/70 text-sm leading-relaxed">{result.strategicRisk}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-[3rem] border-dashed border-2 border-slate-700/50 text-slate-500 px-10 text-center animate-pulse">
              <div className="w-24 h-24 mb-6 rounded-full bg-slate-800/50 flex items-center justify-center text-5xl">
                🔢
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-400">Mathematical Engine Idle</h3>
              <p className="max-w-md leading-relaxed">Submit core revenue and market data to initialize the ratio calculation and strategic neural mapping.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
