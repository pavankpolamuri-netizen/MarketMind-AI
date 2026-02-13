
import React, { useState } from 'react';
import { scoreLead } from '../services/geminiService';
import { LeadScoreResult } from '../types';

const LeadScorer: React.FC = () => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [need, setNeed] = useState('');
  const [urgency, setUrgency] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LeadScoreResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await scoreLead(name, budget, need, urgency);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Failed to score lead.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white">Lead Intelligence Scorer</h2>
        <p className="text-slate-400">Qualify opportunities and prioritize your pipeline with data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Lead / Company Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Budget Details</label>
              <input
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $50k annual, approved budget"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Business Need / Problem</label>
              <textarea
                required
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                placeholder="What pain points are they solving?"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 outline-none"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Urgency Level</label>
              <input
                required
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                placeholder="e.g. Immediate, Q3 implementation"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <button
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                loading ? 'bg-rose-900/50 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20'
              }`}
            >
              {loading ? 'Analyzing Lead...' : 'Generate Score'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6">
              <div className="glass p-10 rounded-3xl flex flex-col md:flex-row gap-10 items-center">
                <div className="relative shrink-0">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-800" />
                    <circle 
                      cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" 
                      strokeDasharray={440} 
                      strokeDashoffset={440 - (440 * result.score) / 100}
                      strokeLinecap="round"
                      className={`${getScoreColor(result.score)} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black ${getScoreColor(result.score)}`}>{result.score}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Score</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider ${getScoreBg(result.score)}`}>
                      {result.score >= 80 ? 'Hot Lead' : result.score >= 50 ? 'Warm Lead' : 'Cold Lead'}
                    </div>
                    <div className="text-slate-400 font-medium">{result.probability}% Conversion Likelihood</div>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg italic">
                    {result.reasoning}
                  </p>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                  Recommended Next Steps
                </h3>
                <div className="grid gap-4">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-800/30 p-5 rounded-2xl border border-slate-700/30">
                      <div className="shrink-0 text-xl">💡</div>
                      <p className="text-slate-300 font-medium">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 glass rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-bold">
                  Export to PDF
                </button>
                <button className="flex-1 py-4 glass rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-bold">
                  Push to CRM
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-3xl border-dashed border-2 border-slate-700 text-slate-500">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-xl font-bold">Awaiting Target</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadScorer;
