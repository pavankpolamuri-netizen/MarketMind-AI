
import React, { useState } from 'react';
import { generateCampaign } from '../services/geminiService';
import { CampaignResult } from '../types';

const CampaignGenerator: React.FC = () => {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CampaignResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateCampaign(product, audience, platform);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate campaign. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Campaign Engine</h2>
          <p className="text-slate-400">Transform product features into market dominance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6 sticky top-10">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Product/Solution Name</label>
              <input
                required
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. AuraFlow SaaS"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Target Audience</label>
              <textarea
                required
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Small business owners looking to automate payroll"
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Primary Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
              >
                <option>LinkedIn</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>X / Twitter</option>
                <option>Google Ads</option>
                <option>Email Marketing</option>
              </select>
            </div>
            <button
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
                loading ? 'bg-indigo-900/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Strategizing...
                </div>
              ) : 'Generate Strategy'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-8 animate-in fade-in duration-1000">
              <div className="glass p-8 rounded-3xl border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-indigo-400">01</span> Campaign Objectives
                </h3>
                <p className="text-slate-300 leading-relaxed">{result.objectives}</p>
              </div>

              <div className="glass p-8 rounded-3xl border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-cyan-400">02</span> Targeted Content Ideas
                </h3>
                <ul className="grid gap-4">
                  {result.contentIdeas.map((idea, i) => (
                    <li key={i} className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 mt-1">{i + 1}</div>
                      <span className="text-slate-300">{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass p-8 rounded-3xl border-l-4 border-violet-500">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-violet-400">03</span> Ad Copy Variations
                </h3>
                <div className="space-y-4">
                  {result.adCopyVariations.map((copy, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 p-5 rounded-xl italic text-slate-400 whitespace-pre-wrap">
                      "{copy}"
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">Calls to Action (CTAs)</h3>
                <div className="flex flex-wrap gap-3">
                  {result.callToActions.map((cta, i) => (
                    <span key={i} className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold border border-emerald-500/20">
                      {cta}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl">
                <h3 className="font-bold mb-2">Tracking & Analytics Strategy</h3>
                <p className="text-slate-400 text-sm">{result.trackingStrategy}</p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-3xl border-dashed border-2 border-slate-700 text-slate-500 px-10 text-center">
              <div className="text-6xl mb-6">📡</div>
              <h3 className="text-xl font-bold mb-2">Ready for Insights</h3>
              <p>Fill out the parameters on the left and hit "Generate Strategy" to see your AI-powered campaign roadmap.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignGenerator;
