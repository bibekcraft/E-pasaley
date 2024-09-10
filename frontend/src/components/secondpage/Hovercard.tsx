import React from "react";

const HoverCard = () => {
  return (
    <div className="relative w-64 p-4 border border-gray-200 rounded-md shadow-md group">
      {/* Main Card Content */}
      <div className="text-center">
        <p className="font-bold">Free Delivery</p>
        <p className="text-sm text-gray-500">Orders from $200</p>
      </div>

      {/* Hover Section */}
      <div className="absolute w-56 p-2 text-center transition-opacity duration-300 transform -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 bottom-10 left-1/2 group-hover:opacity-100">
        <p className="text-xs text-gray-700">
          Get free delivery on all orders over $200. Terms and conditions apply.
        </p>
      </div>
    </div>
  );
};

export default HoverCard;
