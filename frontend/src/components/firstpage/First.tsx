import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../slice/ProductSlice";
import epsl from "../../assets/epsl.png";

function First() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [noProductsMessage, setNoProductsMessage] = useState("");

  // Fetch products
  useEffect(() => {
    dispatch(fetchProduct(1)); // Fetch products
  }, [dispatch]);

  // Handle product search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // If products match the search term
      if (matchedProducts.length > 0) {
        navigate(`/allproducts/${matchedProducts[0].categoryId}`);
      } else {
        const sameNameProducts = products.filter((product) =>
          product.name.toLowerCase() === searchTerm.toLowerCase()
        );

        if (sameNameProducts.length === 0) {
          setNoProductsMessage("No products found matching your search.");
        } else {
          setNoProductsMessage(""); // Clear message if there are same name products
        }
      }
    }
  };

  return (
    <div className="container flex flex-col items-center px-4 py-4 mx-auto shadow-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl">
      {/* Logo and Site Name */}
      <div className="flex items-center mb-4">
        <button className="p-2 transition duration-300 transform rounded-lg hover:scale-105">
          <Link to="/" aria-label="Go home" title="Company" className="inline-flex items-center">
            <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
          </Link>
        </button>
        <h2 className="ml-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          E-pasaley
        </h2>
      </div>

      {/* Search Bar */}
      <div className="relative flex justify-center flex-1 w-full mb-4">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search essentials..."
          className="w-1/2 px-4 py-2 transition duration-300 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-yellow-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="p-2 ml-2 text-white transition duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:bg-yellow-600 animate-bounce"
        >
          Search
        </button>
      </div>

      {/* Display message if no products found */}
      {noProductsMessage && (
        <div className="mt-4 font-semibold text-red-300">{noProductsMessage}</div>
      )}

      {/* Right Side: Sign In/Sign Up and Cart */}
      <div className="flex items-center mt-4">
        <Link to="/login" className="px-4 py-2 text-white hover:underline hover:text-yellow-300">
          Sign In
        </Link>
        <Link to="/register" className="px-4 py-2 text-white hover:underline hover:text-yellow-300">
          Sign Up
        </Link>
        <Link to="/Checkout" className="relative ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l1.35-6H6.7l-1.2-6H2"
            />
            <circle cx="9" cy="21" r="1" fill="currentColor" />
            <circle cx="19" cy="21" r="1" fill="currentColor" />
          </svg>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
            3
          </span>
        </Link>
      </div>
    </div>
  );
}

export default First;
