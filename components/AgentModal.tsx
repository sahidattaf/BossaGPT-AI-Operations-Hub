
import React, { useState, useRef, useEffect } from 'react';
import { Agent } from '../types';
import { XMarkIcon, PencilIcon, GlobeAltIcon, DocumentTextIcon } from './Icons';
import { chatWithAgent } from '../services/ai';

interface AgentModalProps {
  agent: Agent | null;
  onClose: () => void;
}

const ActivationPill: React.FC<{ pathway: { name: string; type: Agent['activationPathways'][0]['type'] } }> = ({ pathway }) => {
    const colors: { [key in typeof pathway.type]: string } = {
        Notion: 'bg-gray-200 text-gray-800 ring-1 ring-inset ring-gray-300',
        YouTube: 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200',
        Chatbot: 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200',
        Dashboard: 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-200',
        GitHub: 'bg-purple-100 text-purple-800 ring-1 ring-inset ring-purple-200',
        Internal: 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200'
    };
    return (
        <span className={`text-xs font-medium mr-2 px-2.5 py-1 rounded-full ${colors[pathway.type]}`}>
            {pathway.name}
        </span>
    );
}

export const AgentModal: React.FC<AgentModalProps> = ({ agent, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!agent) return null;

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await chatWithAgent(agent.systemInstruction || agent.description, userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'agent', content: response || "I'm sorry, I couldn't process that." }]);
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${agent.iconBgColor}`}>
              <agent.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{agent.name}</h2>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                    {agent.category}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${
                    agent.riskLevel === 'High' ? 'bg-red-50 text-red-500 border-red-100' : 
                    agent.riskLevel === 'Medium' ? 'bg-orange-50 text-orange-500 border-orange-100' : 
                    'bg-green-50 text-green-500 border-green-100'
                }`}>
                    {agent.riskLevel} Risk
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {agent.externalLink && (
                <a href={agent.externalLink} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition">
                    <GlobeAltIcon className="w-6 h-6" />
                </a>
            )}
            {agent.notionLink && (
                <a href={agent.notionLink} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition">
                    <DocumentTextIcon className="w-6 h-6" />
                </a>
            )}
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar Info */}
            <div className="hidden md:block w-72 bg-gray-50/50 p-6 border-r border-gray-100 overflow-y-auto">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Capabilities</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{agent.description}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Pathways</h3>
                        <div className="flex flex-wrap gap-y-2">
                            {agent.activationPathways.map((p, i) => <ActivationPill key={i} pathway={p} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sample Task</h3>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-500 font-mono">
                            {agent.promptFormat}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className={`w-16 h-16 rounded-full ${agent.iconBgColor} flex items-center justify-center mb-4 opacity-20`}>
                                <agent.icon className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-gray-900 font-bold">Launch {agent.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">Ready to assist with your restaurant operations.</p>
                        </div>
                    )}
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                m.role === 'user' 
                                ? 'bg-[#1E293B] text-white rounded-tr-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder={`Ask ${agent.name} anything...`}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5964D] focus:border-transparent transition"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTyping}
                            className="absolute right-2 top-2 p-1.5 bg-[#E5964D] text-white rounded-xl hover:bg-[#D5863D] disabled:opacity-50 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
