
import React, { useState } from 'react';
import { generatePitch } from '../services/geminiService';
import { PitchResult } from '../types';

const PitchGenerator: React.FC = () => {
  const [product, setProduct] = useState('');
  const [persona, setPersona] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PitchResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generatePitch(product, persona, industry);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate pitch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white">Pitch Creator</h2>
        <p className="text-slate-400">Craft personalized, persuasive narratives for every prospect.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Your Product/Service</label>
              <input
                required
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Cloud Security Suite"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Customer Persona</label>
              <input
                required
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="e.g. CTO of a Fintech company"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Industry Context</label>
              <input
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Financial Services"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <button
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                loading ? 'bg-emerald-900/50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20'
              }`}
            >
              {loading ? 'Synthesizing...' : 'Generate Sales Pitch'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6">
              <div className="glass p-8 rounded-3xl bg-emerald-900/10 border-emerald-500/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-emerald-400">Elevator Pitch (30s)</h3>
                  <button onClick={() => navigator.clipboard.writeText(result.elevatorPitch)} className="text-xs text-slate-500 hover:text-white uppercase font-bold tracking-widest transition-colors">Copy</button>
                </div>
                <p className="text-lg text-white leading-relaxed font-medium italic">
                  "{result.elevatorPitch}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Value Proposition</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.valueProposition}</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Strategic CTA</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.callToAction}</p>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-4 text-white">Key Differentiators</h3>
                <div className="space-y-3">
                  {result.differentiators.map((diff, i) => (
                    <div key={i} className="flex gap-4 items-center bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-slate-300">{diff}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-8 rounded-3xl border-t-2 border-slate-700">
                <h3 className="text-lg font-bold mb-4 text-white">Follow-up Roadmap</h3>
                <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">{result.followUpPlan}</p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-3xl border-dashed border-2 border-slate-700 text-slate-500">
              <div className="text-6xl mb-6">🎙️</div>
              <h3 className="text-xl font-bold">Waiting for Your Input</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PitchGenerator;
