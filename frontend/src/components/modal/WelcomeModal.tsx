import React, { useState } from 'react';

const WelcomeModal: React.FC = () => {
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

  // Close modal function
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background blur effect */}
          <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Modal container */}
          <div className="relative z-50 max-w-lg px-8 py-6 transition-transform duration-500 ease-out transform translate-y-10 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold text-gray-900">
                🎉 Welcome to Our Store! 🎉
              </h2>
              <button onClick={handleClose} className="text-2xl text-gray-500 hover:text-gray-800">
                ✖
              </button>
            </div>

            {/* Welcome message */}
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Welcome to our store! Unlock access to exclusive products at amazing discounts.
              Shop now and get the best deals just for you!
            </p>

            {/* Highlighted Offer */}
            <div className="p-5 mt-6 text-center text-indigo-800 rounded-lg shadow-md bg-gradient-to-r from-indigo-200 to-purple-200">
              <h3 className="text-lg font-semibold">
                ✨ Exclusive Offer: Get <span className="font-bold">20% off</span> on your first order! ✨
              </h3>
            </div>

            {/* Instagram Promo Section */}
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-700">
                Want more discounts? Connect with us on Instagram for a promo code!
              </p>
              <a
                href="https://www.instagram.com/shopwithepasaley/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-500 underline hover:text-indigo-700"
              >
                Follow us on Instagram
              </a>
            </div>

            {/* Close button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleClose}
                className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModal;
