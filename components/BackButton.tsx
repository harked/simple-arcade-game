
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 left-4 flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/70 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 backdrop-blur-sm"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Back to Games
  </button>
);

export default BackButton;
