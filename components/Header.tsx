
import React, { useState } from 'react';
import { ChefHatIcon, ShareIcon } from './Icons';

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'BossaGPT | AI Operations Hub',
      text: 'Check out the AI-powered operations hub for Bossa Asado i Mar.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled or failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <header className="py-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-[#E5964D] p-3 rounded-lg shadow-sm">
            <ChefHatIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bossa Asado i Mar</h1>
            <p className="text-gray-500">AI Operations Hub | Fire-Grill Restaurant & Bar</p>
            <p className="text-sm text-gray-400">Willemstad, Curaçao</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 mr-2">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <button className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-default">
                  47 AI Agents Registered
                </button>
            </div>
            
            <button 
                onClick={handleShare}
                className={`flex items-center space-x-2 font-bold py-2 px-4 rounded-lg shadow-sm transition-all duration-300 border ${
                    copied 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50/50 hover:shadow-md active:scale-95'
                }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ShareIcon className="w-4 h-4" />
                  <span>Share Hub</span>
                </>
              )}
            </button>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gradient-to-r from-[#E5964D] via-[#F9A826] to-transparent mt-6"></div>
    </header>
  );
};
