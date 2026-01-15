
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">Bossa Asado i Mar</h3>
            <p className="mt-2 text-gray-400">Fire-grill restaurant & bar powered by AI operations in Willemstad, Curaçao.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">AI Capabilities</h4>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>• Chain-of-thought reasoning</li>
              <li>• Bilingual support (EN & PAP)</li>
              <li>• Professional image prompts</li>
              <li>• Personalized outputs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Contact Information</h4>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <span className="block text-white font-medium text-lg">Sahid J Attaf</span>
                <a href="tel:+59995230683" className="text-[#E5964D] hover:text-[#f2a65d] transition-colors font-bold text-lg">
                  +5999 5230683
                </a>
              </li>
              <li className="pt-2 border-t border-gray-800 mt-2">
                <span className="block text-xs uppercase text-gray-500 font-bold tracking-widest mb-1">Headquarters</span>
                <span className="block">Willemstad, Curaçao</span>
                <span className="block italic text-gray-500 text-sm">AI Operations Hub</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>© 2024 Bossa Asado i Mar. AI-powered restaurant operations.</p>
        </div>
      </div>
    </footer>
  );
};
