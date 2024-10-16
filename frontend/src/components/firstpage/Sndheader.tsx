import React from 'react';

function Sndheader() {
  return (
    <header className="w-full py-0 text-blue-900 bg-white font-poppins">
      {/* Sliding Text Section */}
      <div className="w-full py-4 overflow-hidden bg-green-700">
        <div className="marquee">
          <div
            className="text-white animate-marquee"
            style={{ fontSize: '0.85rem' }} // Reduced font size for sliding text
          >
            Contact us at: E-pasaley | Follow us on Instagram: @Epasaley | 
            Add promocode to get a certain discount on our products ||
            {/* Replace promo codes section with static text */}
            <span className="text-white font-extralight">
              Special Offers Available! Visit our website for more details.
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Sndheader;
