
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { AgentCard } from './components/AgentCard';
import { Footer } from './components/Footer';
import { AgentModal } from './components/AgentModal';
import { OverviewTab } from './components/OverviewTab';
import { agents } from './constants/agents';
import { Agent } from './types';
import { SettingsIcon, PencilIcon, BoltIcon, MagnifyingGlassIcon } from './components/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('AI Agents');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories from agents list
  const categories = useMemo(() => {
    const cats = new Set(agents.map(agent => agent.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  // Filter agents based on selected category and search query
  const filteredAgents = useMemo(() => {
    let result = agents;
    
    if (selectedCategory !== 'All') {
      result = result.filter(agent => agent.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(agent => 
        agent.name.toLowerCase().includes(query) || 
        agent.description.toLowerCase().includes(query) ||
        agent.category.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);

  const handleOpenModal = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleCloseModal = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="bg-[#FFFDFA] min-h-screen text-[#1E293B] selection:bg-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Header />
        <main>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'AI Agents' && (
            <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              {/* Search and Filter Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-xl">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search agents by name, role, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>

                {/* Category Filter Bar */}
                <div className="flex items-center overflow-x-auto pb-2 -mx-4 px-4 space-x-2 no-scrollbar md:pb-0 md:mx-0 md:px-0">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                        selectedCategory === category
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md scale-105'
                          : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-gray-700 shadow-sm'
                      }`}
                    >
                      {category}
                      <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${
                        selectedCategory === category ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {category === 'All' ? agents.length : agents.filter(a => a.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} onClick={() => handleOpenModal(agent)} />
                ))}
              </div>

              {filteredAgents.length === 0 && (
                <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                  <div className="inline-flex p-4 rounded-full bg-gray-100 text-gray-400 mb-4">
                    <MagnifyingGlassIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">No agents found</h3>
                  <p className="text-gray-500 mt-2 max-w-xs mx-auto">Try adjusting your search terms or category filter to find what you're looking for.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-6 text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'Overview' && <OverviewTab />}
          
          {activeTab === 'Dashboard' && (
            <div className="text-center py-20">
              <div className="inline-flex p-4 rounded-full bg-blue-50 text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Global Analytics Dashboard</h2>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">This section will aggregate real-time metrics from all 18 active agents for centralized monitoring.</p>
              <button className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition">Request Access</button>
            </div>
          )}
        </main>
      </div>
      <Footer />
      {selectedAgent && (
        <AgentModal agent={selectedAgent} onClose={handleCloseModal} />
      )}
      <div className="fixed bottom-6 right-6 flex items-center space-x-2 z-40">
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer border border-gray-100">
          <PencilIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer border border-gray-100">
          <BoltIcon className="w-6 h-6 text-purple-600" />
        </div>
        <div className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 hover:-translate-y-1 transition duration-300 cursor-pointer">
          <SettingsIcon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};

export default App;
