import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../slice/ProductSlice";
import epsl from "../../assets/epsl.png"; // Use colored logo image
import { RootState } from "../store/Store"; // Import RootState for typing
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // Import FontAwesome Icons
import React from "react";

function First() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch products from state (assuming products is part of your root state)
    const product = useSelector((state: RootState) => state.product.product);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Only allow products that match a certain condition
    const matchedProducts = product ? [product] : [];

    const handleSearch = () => {
        // Implement your search logic here
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading state to true
            await dispatch(fetchProduct(1)); // Fetch a product (replace with appropriate product ID)
            setLoading(false); // Set loading state to false after fetching
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="container flex flex-col items-center px-4 py-6 mx-auto bg-white shadow-lg rounded-xl">
            {/* Logo and Site Name */}
            <div className="flex items-center mb-6">
                <Link to="" aria-label="Go home" title="Company" className="inline-flex items-center">
                    <img src={epsl} alt="E-pasaley Logo" className="w-auto h-24" />
                </Link>
                <h2 className="ml-2 text-6xl font-bold text-blue-400">E-pasaley</h2>
            </div>

            {/* Refined Search Bar */}
            <div className="flex w-full max-w-md mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-4 text-xl border border-gray-300 rounded-l-lg focus:ring focus:ring-blue-300 focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-4 text-xl text-white transition duration-300 bg-green-600 rounded-r-lg hover:bg-green-700"
                >
                    <FaSearch className="w-6 h-6" />
                </button>
            </div>

            {/* Products Display */}
            <div className="grid w-full grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {loading ? (
                    <div className="text-xl text-center text-gray-600 col-span-full">Loading products...</div>
                ) : (
                    matchedProducts.map((product) => (
                        <div key={product.id} className="p-4 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-md hover:shadow-xl">
                            <h3 className="text-lg font-semibold text-blue-700">{product.name}</h3>
                            <p className="text-blue-600">${product.final_price.toFixed(2)}</p>
                            <Link to={`/allproducts/${product.categoryId}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Links Section */}
            <div className="flex justify-center w-full mt-4 space-x-6">
                <Link to="/trackorder" className="relative flex items-center text-xl font-medium text-gray-600 group">
                    <span className="mr-1">Track Order</span>
                    <span className="absolute left-0 w-0 h-1.5 transition-all duration-300 bg-green-600 -bottom-1 group-hover:w-full"></span>
                </Link>

                <Link to="/checkout" className="relative flex items-center text-xl font-medium text-gray-600 group">
                    <FaShoppingCart className="mr-2" /> Cart
                    <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {isAuthenticated ? (
                    <Link to="/offers" className="relative text-xl font-medium text-gray-600 group">
                        Offers
                        <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ) : (
                    <Link to="/register" className="relative text-xl font-medium text-gray-600 group">
                        Sign Up
                        <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default First;
