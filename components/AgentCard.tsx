
import React from 'react';
import { Agent } from '../types';
import { PencilIcon, BoltIcon, GlobeAltIcon } from './Icons';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 ${agent.iconBgColor}`}></div>

      <div>
        <div className="flex items-start justify-between">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${agent.iconBgColor}`}>
            <agent.icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1 ${
                agent.riskLevel === 'High' ? 'text-red-500 border-red-100 bg-red-50' : 
                agent.riskLevel === 'Medium' ? 'text-orange-500 border-orange-100 bg-orange-50' : 
                'text-green-500 border-green-100 bg-green-50'
            }`}>
                {agent.riskLevel} Risk
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{agent.status || 'Active'}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-5 text-gray-800 group-hover:text-[#E5964D] transition-colors">{agent.name}</h3>
        <p className="text-[10px] font-bold bg-gray-50 text-gray-400 uppercase tracking-wider inline-block px-2 py-1 rounded mt-1.5 border border-gray-100">{agent.category}</p>
        <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-2">{agent.description}</p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex -space-x-1">
            {agent.activationPathways.slice(0, 2).map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
            ))}
            {agent.activationPathways.length > 2 && (
                <div className="text-[10px] text-gray-400 pl-2 self-center">+{agent.activationPathways.length - 2} more</div>
            )}
        </div>
        <div className="flex items-center space-x-2">
            {agent.externalLink && (
                 <button onClick={(e) => { e.stopPropagation(); window.open(agent.externalLink); }} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition">
                    <GlobeAltIcon className="w-4 h-4" />
                </button>
            )}
            <button className="bg-gray-900 text-white text-[11px] font-bold py-1.5 px-4 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Launch
            </button>
        </div>
      </div>
    </div>
  );
};
