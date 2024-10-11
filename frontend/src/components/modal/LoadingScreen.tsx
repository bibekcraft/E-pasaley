import React from 'react';
import epsl from '../../assets/epsl.png'

export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-white">
      <div className="flex items-center justify-center animate-slide-right">
        {/* Enlarged Logo */}
        <img
          src={epsl} // Replace this with the path to your logo
          alt="ePasaley Logo"
          className="w-40 h-40 transform scale-110 md:w-60 md:h-60 animate-bounce"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
