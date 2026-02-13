
import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
  isAdmin?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isAdmin }) => {
  const features = [
    {
      view: AppView.MARKET_INSIGHTS,
      title: 'Market Ratios',
      description: 'Analyze your sales performance vs total market potential.',
      icon: '📈',
      color: 'cyan'
    },
    {
      view: AppView.PLATFORM,
      title: 'Social Channels',
      description: 'Master YouTube, Instagram, and Twitter growth strategies.',
      icon: '📱',
      color: 'indigo'
    },
    {
      view: AppView.CAMPAIGN,
      title: 'Campaign Engine',
      description: 'Generate data-driven multi-platform marketing strategies.',
      icon: '🚀',
      color: 'violet'
    },
    {
      view: AppView.PITCH,
      title: 'Sales Pitch Creator',
      description: 'Craft high-impact elevator pitches for specific personas.',
      icon: '🎤',
      color: 'emerald'
    },
    {
      view: AppView.LEAD_SCORE,
      title: 'Lead Intel Scorer',
      description: 'Quantify lead quality and prioritize your pipeline.',
      icon: '🎯',
      color: 'rose'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4">
        <h2 className="text-4xl font-extrabold text-white leading-tight">
          Welcome to <br/>
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            MarketMind Intelligence
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Leverage advanced neural processing to transform product concepts into dominant market strategies and precision-targeted sales narratives.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <button
            key={feature.view}
            onClick={() => onNavigate(feature.view)}
            className="group relative p-8 glass rounded-3xl text-left transition-all duration-300 hover:ring-2 hover:ring-indigo-500/50 hover:-translate-y-1 shadow-lg"
          >
            <div className={`text-4xl mb-6 inline-block`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
            <div className="mt-8 flex items-center text-sm font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Activate Module →
            </div>
          </button>
        ))}
      </div>

      <div className="p-10 glass rounded-[2.5rem] border border-indigo-500/10 bg-gradient-to-br from-indigo-900/10 to-transparent">
        <h3 className="text-2xl font-bold mb-6">Neural Network Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Strategies Deployed', value: '4,512' },
            { label: 'Confidence Index', value: '98.4%' },
            { label: 'Market Velocity', value: '+31%' },
            { label: 'Persona Matches', value: '12.8k' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1 tabular-nums">{stat.value}</div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
