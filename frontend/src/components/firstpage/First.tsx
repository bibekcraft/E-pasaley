import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import epsl from "../../assets/epsl.png";
function First() {
  // Access the authentication state from the Redux store
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated); // Adjust this based on your Redux structure

  return (
    <div className="bg-white shadow-md">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <div className="flex items-center">
          <button className="p-2 rounded-lg">
          <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
            </a>
          </button>
          <h2 className="ml-2 text-2xl font-bold text-green-600">E-pasaley</h2>
        </div>
        <div className="flex justify-center flex-1">
          <input
            type="text"
            placeholder="Search essentials, groceries and more..."
            className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="p-2 ml-2 text-white bg-green-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11.742 10.142A5.37 5.37 0 0013 7.5 5.5 5.5 0 107 13a5.37 5.37 0 002.642-1.258l4.368 4.368a1 1 0 001.415-1.415l-4.368-4.368zM10 2a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center mr-12 space-x-5">
          <a href="#" className="text-green-600">Track your order</a>
          <a href="#" className="text-green-600">All Offers</a>
          {!isAuthenticated ? ( // Conditionally render Sign Up/Sign In link
            <Link to="/login" className="text-green-600">Sign Up/Sign In</Link>
          ) : (
            <Link to="/allproducts" className="text-green-600">ShopNow</Link>
)}
          <div className="flex space-x-4">
            <Link to="/checkout" className="text-green-600">
              <button className="w-20 h-11">
                <HiOutlineShoppingCart className="w-full h-full" fill="white" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default First;
