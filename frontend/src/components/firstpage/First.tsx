import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { fetchProduct } from "../slice/ProductSlice"; 
import { fetchCategories } from "../slice/CategorySlice"; 
import epsl from "../../assets/epsl.png";

function First() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.categories);

  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // State for selected category
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products and categories
  useEffect(() => {
    dispatch(fetchProduct(1)); // Fetch products
    dispatch(fetchCategories()); // Fetch categories
  }, [dispatch]);

  // Filter products based on the selected category and search term
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategoryId
        ? product.categoryId === parseInt(selectedCategoryId) // Check if product's category matches the selected category
        : true; // If no category is selected, return all products

      return matchesCategory && product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategoryId]);

  // Handle product search
  const handleSearch = () => {
    if (searchTerm.trim() !== "" && selectedCategoryId) {
      const matchedProduct = filteredProducts.find((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (matchedProduct) {
        navigate(`/productview/${matchedProduct.categoryId}/${matchedProduct.id}`);
      } else {
        alert("No products found in this category.");
      }
    } else {
      alert("Please select a category and enter a search term.");
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container flex items-center justify-between py-4 mx-auto">
        {/* Logo and Site Name */}
        <div className="flex items-center">
          <button className="p-2 rounded-lg">
            <Link to="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
            </Link>
          </button>
          <h2 className="ml-2 text-2xl font-bold text-green-600">E-pasaley</h2>
        </div>

        {/* Search Bar and Category Selection */}
        <div className="relative flex justify-center flex-1">
          {/* Category Selection Dropdown */}
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-1/5 px-4 py-2 mr-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          
          {/* Search Input (Reduced size) */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search essentials..."
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch} className="p-2 ml-2 text-white bg-green-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11.742 10.142A5.37 5.37 0 0013 7.5 5.5 5.5 0 107 13a5.37 5.37 0 002.642-1.258l4.368 4.368a1 1 0 001.415-1.415l-4.368-4.368zM10 9a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
            </svg>
          </button>
          {/* Suggestions based on search term */}
          {searchTerm && (
            <div className="absolute z-10 w-1/3 p-2 mt-10 mr-12 bg-white border border-gray-300 rounded-lg shadow-lg">
              <h3 className="text-sm font-bold">Suggestions</h3>
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 5).map((product) => (
                  <Link
                    to={`/productview/${product.categoryId}/${product.id}`} // Use categoryId
                    key={product.id}
                    className="block p-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setSearchTerm(""); // Clear search term on suggestion click
                    }}
                  >
                    {product.name} (Category ID: {product.categoryId})
                  </Link>
                ))
              ) : (
                <p>No suggestions available.</p>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Sign In/Sign Up and Cart */}
        <div className="flex items-center">
          {/* Sign In / Sign Up */}
          <Link to="/signin" className="px-4 py-2 text-green-600">Sign In</Link>
          <Link to="/signup" className="px-4 py-2 text-green-600">Sign Up</Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-600"
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
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
              3
            </span> {/* Example cart item count */}
          </Link>
        </div>
      </div>

      {/* Product List */}
      <div className="container mx-auto mt-6">
        <h2 className="text-xl font-bold">Products in {selectedCategoryId ? categories.find(cat => cat.id === parseInt(selectedCategoryId))?.name : "All Categories"}</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold">
                {product.name} (Category ID: {product.categoryId})
              </h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <Link to={`/productview/${product.categoryId}/${product.id}`} className="mt-4 text-green-600 hover:underline">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default First;
