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

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products and categories
  useEffect(() => {
    dispatch(fetchProduct(1)); // Adjust according to your logic
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter products based on the search term
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Handle product search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const matchedProduct = products.find((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedProduct) {
        navigate(`/productview/${matchedProduct.categoryId}/${matchedProduct.id}`);
      } else {
        alert("No products found.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <div className="flex items-center">
          <button className="p-2 rounded-lg">
            <Link to="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
            </Link>
          </button>
          <h2 className="ml-2 text-2xl font-bold text-green-600">E-pasaley</h2>
        </div>
        <div className="relative flex justify-center flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search essentials, groceries and more..."
            className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg"
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
            <div className="absolute z-10 w-2/3 p-2 mt-10 mr-12 bg-white border border-gray-300 rounded-lg shadow-lg">
              <h3 className="text-sm font-bold">Suggestions</h3>
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 5).map((product) => (
                  <Link
                    to={`/productview/${product.categoryId}/${product.id}`}
                    key={product.id}
                    className="block p-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setSearchTerm(""); // Clear search term on suggestion click
                    }}
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <p>No suggestions available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default First;
