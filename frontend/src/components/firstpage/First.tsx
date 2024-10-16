import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../slice/ProductSlice";
import epsl from "../../assets/epsl.png";
import { RootState } from "../store/Store"; // Import RootState if needed for typing
import { FaShoppingCart } from "react-icons/fa"; // Import FontAwesome Cart Icon

function First() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch products from the Redux store
  const { products } = useSelector((state: RootState) => state.product);

  // Check if the user is authenticated
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);

  const [searchTerm, setSearchTerm] = useState("");
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProduct(1)); // Fetch products
  }, [dispatch]);

  // Handle product search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMatchedProducts(filteredProducts);
    } else {
      setMatchedProducts(products); // Show all products if no search term
    }
  };

  return (
    <div className="container flex flex-col items-center px-4 py-6 mx-auto bg-white shadow-lg rounded-xl">
      {/* Logo and Site Name */}
      <div className="flex items-center mb-4">
        <Link to="/" aria-label="Go home" title="Company" className="inline-flex items-center">
          <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
        </Link>
        <h2 className="ml-2 text-4xl font-bold text-green-600">E-pasaley</h2>
      </div>

      {/* Search Bar */}
      <div className="relative flex justify-center w-full mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search essentials..."
          className="w-1/2 px-4 py-2 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="p-2 ml-2 text-white transition duration-300 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Products Display */}
      <div className="flex flex-wrap justify-center w-full mb-4">
        {matchedProducts.map((product) => (
          <div key={product.id} className="p-4 m-2 transition-shadow duration-300 rounded-lg shadow-md bg-gray-50 hover:shadow-xl w-60">
            <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <Link to={`/allproducts/${product.categoryId}`} className="text-blue-600 hover:underline">
              View Details
            </Link>
          </div>
        ))}
        {searchTerm.trim() !== "" && matchedProducts.length === 0 && (
          <p className="mt-4 text-xl text-red-600">No products found matching your search.</p>
        )}
      </div>

      {/* Links Section */}
      <div className="flex justify-center w-full mt-4 space-x-4">
        <Link to="/trackorder" className="relative font-medium text-black group">
          Track Order
          <span className="absolute left-0 w-0 h-1.5 transition-all duration-300 bg-green-600 -bottom-1 group-hover:w-full"></span>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative flex items-center font-medium text-black group">
          <FaShoppingCart className="mr-2" /> Cart
          <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Conditionally Render Offers or Auth Links */}
        {isAuthenticated ? (
          <Link to="/offers" className="relative font-medium text-black group">
            Offers
            <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ) : (
          <>
            <Link to="/login" className="relative font-medium text-black group">
              Sign In
              <span className="absolute left-0 -bottom-1 h-1.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/register" className="relative font-medium text-black group">
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
