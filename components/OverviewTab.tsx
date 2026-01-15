
import React, { useState, useEffect, useMemo } from 'react';
import { getBossVisionSummary, getGuestFeedbackSummary } from '../services/ai';
import { agents } from '../constants/agents';

export const OverviewTab: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  // Calculate agent status counts
  const statusSummary = useMemo(() => {
    return agents.reduce((acc, agent) => {
      const status = agent.status || 'Active';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { 'Active': 0, 'In Build': 0, 'Draft': 0, 'Testing': 0 } as Record<string, number>);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      // 1. Fetch Executive Brief
      const dataString = agents.map(a => `${a.name}: ${a.description}`).join('; ');
      getBossVisionSummary(dataString)
        .then(res => setSummary(res || ''))
        .catch(() => setSummary('Unable to fetch executive brief.'))
        .finally(() => setLoading(false));

      // 2. Fetch Guest Sentiment Analysis
      getGuestFeedbackSummary()
        .then(res => setFeedback(res || ''))
        .catch(() => setFeedback('Unable to process guest feedback data at this time.'))
        .finally(() => setFeedbackLoading(false));
    };

    loadData();
  }, []);

  return (
    <div className="mt-8 space-y-6 pb-12 animate-in fade-in duration-700">
      {/* Executive Brief Card */}
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center">
              <span className="bg-[#E5964D] p-2.5 rounded-xl mr-4 shadow-xl shadow-orange-900/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </span>
              BossVision Executive Brief
            </h2>
            <span className="text-xs font-mono text-orange-200/50 uppercase tracking-widest">Live Operations Intelligence</span>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-800 rounded-full w-1/2 animate-pulse"></div>
              <div className="h-32 bg-slate-800/50 rounded-2xl mt-6 animate-pulse border border-slate-700/50"></div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-slate-300 font-medium">
                {summary}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center text-lg">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 shadow-sm shadow-green-200"></span>
                    Kitchen Throughput
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Real-Time</span>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-5xl font-black text-gray-900 tracking-tight">84%</p>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Station saturation optimal</p>
                </div>
                <div className="w-32 h-16 bg-gray-50 rounded-xl flex items-end p-2 space-x-1.5 border border-gray-100">
                    <div className="h-1/2 w-full bg-blue-500 rounded-md opacity-40"></div>
                    <div className="h-2/3 w-full bg-blue-500 rounded-md opacity-60"></div>
                    <div className="h-full w-full bg-blue-600 rounded-md"></div>
                    <div className="h-4/5 w-full bg-blue-500 rounded-md opacity-80"></div>
                </div>
            </div>
        </div>
        <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center text-lg">
                    <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-3 shadow-sm shadow-orange-200"></span>
                    Booking Velocity
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Weekly View</span>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-5xl font-black text-gray-900 tracking-tight">+12%</p>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Revenue pacing positive</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                </div>
            </div>
        </div>
      </div>

      {/* Agent Status Overview */}
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
            Agent Status Overview
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-green-50 rounded-3xl border border-green-100">
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Active</p>
                <p className="text-3xl font-black text-green-700">{statusSummary['Active']}</p>
                <div className="w-full h-1 bg-green-200 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
            </div>
            <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">In Build</p>
                <p className="text-3xl font-black text-blue-700">{statusSummary['In Build']}</p>
                <div className="w-full h-1 bg-blue-200 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
                </div>
            </div>
            <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Testing</p>
                <p className="text-3xl font-black text-orange-700">{statusSummary['Testing']}</p>
                <div className="w-full h-1 bg-orange-200 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: '40%' }}></div>
                </div>
            </div>
            <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Draft</p>
                <p className="text-3xl font-black text-gray-700">{statusSummary['Draft']}</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gray-400" style={{ width: '20%' }}></div>
                </div>
            </div>
        </div>
      </div>

      {/* Guest Sentiment & Feedback Analysis */}
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="flex items-center">
                <div className="bg-rose-500 p-3 rounded-2xl mr-4 shadow-lg shadow-rose-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      Guest Sentiment Analysis
                      <div className="flex ml-3 space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" title="Aggregating Google Reviews" />
                        <img src="https://www.yelp.com/favicon.ico" className="w-4 h-4" alt="Yelp" title="Aggregating Yelp Reviews" />
                      </div>
                    </h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter mt-0.5">Aggregated Multi-Platform Intelligence</p>
                </div>
            </div>
            
            <div className="mt-6 lg:mt-0 flex items-center space-x-3">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm z-30 ring-2 ring-white hover:z-40 transition-all cursor-help" title="Sourced from Google Business">
                        <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm z-20 ring-2 ring-white hover:z-40 transition-all cursor-help" title="Sourced from Yelp">
                        <img src="https://www.yelp.com/favicon.ico" className="w-4 h-4" alt="Yelp" />
                    </div>
                </div>
                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse"></span>
                    <span>Live Pulse</span>
                </div>
            </div>
        </div>

        {feedbackLoading ? (
            <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-rose-50 rounded-full w-1/3"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-50 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-50 rounded-full w-5/6"></div>
                    <div className="h-4 bg-gray-50 rounded-full w-4/6"></div>
                </div>
            </div>
        ) : (
            <div className="relative">
                <div className="bg-[#FFF8F8] p-8 rounded-[1.5rem] border border-rose-100/60 relative overflow-hidden group/card">
                    {/* Floating Brand Icons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-10 group-hover/card:opacity-30 transition-opacity">
                        <img src="https://www.google.com/favicon.ico" className="w-8 h-8 grayscale" alt="" />
                        <img src="https://www.yelp.com/favicon.ico" className="w-8 h-8 grayscale" alt="" />
                    </div>

                    <div className="whitespace-pre-wrap leading-relaxed text-gray-700 italic font-medium relative z-10">
                        {/* Inline Attribution Icons */}
                        <span className="inline-flex items-center mr-3 mb-1 not-italic select-none bg-white py-1 px-1.5 rounded-lg border border-rose-100 shadow-sm transition-transform hover:scale-110">
                            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 mr-1.5" alt="Google" />
                            <img src="https://www.yelp.com/favicon.ico" className="w-4 h-4" alt="Yelp" />
                        </span>
                        {feedback}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-rose-100/30 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <div className="flex -space-x-1">
                              <img src="https://www.google.com/favicon.ico" className="w-3 h-3 rounded-full border border-white" alt="" />
                              <img src="https://www.yelp.com/favicon.ico" className="w-3 h-3 rounded-full border border-white" alt="" />
                           </div>
                           <span className="text-[9px] font-bold text-rose-300 uppercase tracking-tighter">Verified Review Sources</span>
                        </div>
                        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Sourced from Yelp & Google Business</span>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
