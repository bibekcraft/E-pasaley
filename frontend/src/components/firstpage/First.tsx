// src/components/First.tsx
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../slice/ProductSlice";
import epsl from "../../assets/epsl.png"; // Use colored logo image
import { RootState } from "../store/Store"; // Import RootState for typing
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // Import FontAwesome Icons
import React from "react";

function First() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Fetch products from state (assuming products is part of your root state)
    const product = useSelector((state: RootState) => state.product.product); // Adjust according to your state structure
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Check if user is authenticated

    // Only allow products that match a certain condition, here assuming you have an `isMatched` property
    const matchedProducts = product ? [product] : []; // Wrap in an array if a single product is fetched
    
    const handleSearch = () => {
        // Implement your search logic here
    };

    useEffect(() => {
        dispatch(fetchProduct(1)); // Fetch a product (replace with appropriate product ID)
    }, [dispatch]);

    return (
        <div className="container flex flex-col items-center px-4 py-6 mx-auto bg-white shadow-lg rounded-xl">
            {/* Logo and Site Name */}
            <div className="flex items-center mb-4">
                <Link to="/" aria-label="Go home" title="Company" className="inline-flex items-center">
                    <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
                </Link>
                <h2 className="ml-2 text-4xl font-bold text-gray-800">E-pasaley</h2>
            </div>

            {/* Search Bar */}
            <div className="flex w-full mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSearch}
                    className="p-2 ml-2 text-white transition duration-300 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:bg-green-700"
                >
                    <FaSearch />
                </button>
            </div>

            {/* Products Display */}
            <div className="flex flex-wrap justify-center w-full mb-4">
                {matchedProducts.map((product) => (
                    <div key={product.id} className="p-4 m-2 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-md hover:shadow-xl w-60">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600">${product.final_price.toFixed(2)}</p>
                        <Link to={`/allproducts/${product.categoryId}`} className="text-blue-600 hover:underline">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            {/* Links Section */}
            <div className="flex justify-center w-full mt-4 space-x-4">
                <Link to="/trackorder" className="relative flex items-center font-medium text-gray-800 group">
                    <span className="mr-1">Track Order</span>
                    <span className="absolute left-0 w-0 h-1.5 transition-all duration-300 bg-green-600 -bottom-1 group-hover:w-full"></span>
                </Link>

                <Link to="/cart" className="relative flex items-center font-medium text-gray-800 group">
                    <FaShoppingCart className="mr-2" /> Cart
                    <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {isAuthenticated ? (
                    <Link to="/offers" className="relative font-medium text-gray-800 group">
                        Offers
                        <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="relative font-medium text-gray-800 group">
                            Sign In
                            <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link to="/register" className="relative font-medium text-gray-800 group">
                            Sign Up
                            <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default First;
