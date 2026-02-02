
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-lg">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Chemical Equipment Parameter Visualizer
        </h1>
      </div>
    </header>
  );
};

export default Header;
