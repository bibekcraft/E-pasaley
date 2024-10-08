import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import epsl from "../../assets/epsl.png";
function Second() {
  return (
    <div className="bg-white shadow-md">
      <div className="container flex items-center justify-between py-4 mx-auto">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img src={epsl} alt="Logo" className="w-32 h-auto" /> {/* Replace with your logo path */}
          <h2 className="ml-2 text-2xl font-bold text-green-800">E-pasaley</h2>
        </div>
        
        {/* Text and links on the left */}
        <div className="flex items-center space-x-5">
          <a href="#" className="text-green-800">Track your order</a>
          <a href="#" className="text-green-800">All Offers</a>
        </div>

        {/* Cart section on the right */}
        <div className="flex items-center">
          <Link to="/checkout" className="text-green-800">
            <button className="w-20 h-11">
              <HiOutlineShoppingCart className="w-full h-full" fill="white" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Second;
