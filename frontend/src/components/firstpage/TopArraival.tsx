import React from 'react';

// Importing Font Awesome icons
import { FaHandHoldingUsd, FaDollarSign, FaStar, FaShippingFast, FaBoxOpen } from 'react-icons/fa';

const TopArraival = () => {
  const features = [
    {
      icon: <FaHandHoldingUsd size={70} />,
      text: '100% Money Back Guarantee',
    },
    {
      icon: <FaDollarSign size={70} />,
      text: 'Lowest Overall Order Cost',
    },
    {
      icon: <FaStar size={70} />,
      text: 'Premium & Luxury Brands',
    },
    {
      icon: <FaShippingFast size={70} />,
      text: 'Worldwide Shipping',
    },
    {
      icon: <FaBoxOpen size={70} />,
      text: '300M+ International Products',
    },
  ];

  return (
    <div className="py-12 bg-green-700">
      <div className="flex items-center justify-around space-x-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`text-center ${index !== 0 ? 'border-l-2 border-white pl-8' : ''}`}
          >
            <div className="mb-4 text-white">
              {feature.icon}
            </div>
            <p className="text-lg font-semibold text-white">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArraival;
