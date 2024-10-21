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
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Fetch products from state
    const products = useSelector((state: RootState) => state.product.products); // Use products instead of product
    const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);

    // Filter products based on the search query
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading state to true
            await dispatch(fetchProduct(1)); // Fetch products (replace with appropriate category ID)
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
            <div className="flex w-full max-w-md mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-4 text-xl border border-gray-300 rounded-l-lg focus:ring focus:ring-blue-300 focus:outline-none"
                    value={searchQuery} // Bind input value to searchQuery state
                    onChange={handleSearch} // Handle input change
                />
                <button
                    onClick={() => {}}
                    className="px-4 py-4 text-xl text-white transition duration-300 bg-green-600 rounded-r-lg hover:bg-green-700"
                >
                    <FaSearch className="w-6 h-6" />
                </button>
            </div>

            {/* Products Display */}
            <div className="flex justify-center w-full mb-6">
                {loading ? (
                    <div className="text-xl text-center text-gray-600">Loading products...</div>
                ) : (
                    searchQuery && ( // Only show results if there's a search query
                        <div className="flex flex-col w-full max-w-md p-4 space-y-2 bg-white border border-gray-300 rounded-lg shadow-md">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/allproducts/${product.id}`} // Pass product ID as a URL parameter
                                        className="text-black hover:underline"
                                    >
                                        {product.name}
                                    </Link>
                                ))
                            ) : (
                                <div className="text-lg text-gray-600">No products found.</div>
                            )}
                        </div>
                    )
                )}
            </div>

            {/* Links Section */}
            <div className="flex justify-center w-full mt-4 space-x-6">
                {isAuthenticated ? (
                    <>
                        <Link to="/checkout" className="relative flex items-center text-xl font-medium text-gray-600 group">
                            <FaShoppingCart className="mr-2" /> Cart
                            <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>

                        <Link to="/allproducts" className="relative text-xl font-medium text-gray-600 group">
                            All Categories
                            <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </>
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
