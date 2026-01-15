
import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabButton: React.FC<{ tabName: string; activeTab: string; onClick: (tab: string) => void }> = ({ tabName, activeTab, onClick }) => {
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={() => onClick(tabName)}
      className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-white text-gray-800 shadow-md' 
          : 'bg-transparent text-gray-500 hover:text-gray-700'
        }`}
    >
      {tabName}
    </button>
  );
};

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Overview', 'AI Agents', 'Dashboard'];
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100/70 p-1 rounded-xl flex space-x-1">
        {tabs.map(tab => (
          <TabButton key={tab} tabName={tab} activeTab={activeTab} onClick={setActiveTab} />
        ))}
      </div>
    </div>
  );
};
