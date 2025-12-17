
import React from 'react';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 cursor-pointer 
                 transform hover:scale-105 hover:bg-gray-700/70 transition-all duration-300 ease-in-out
                 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-500/30"
    >
      <div className="mb-4 text-indigo-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};
