// components/First.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem, clearItems } from "../features/cart/cartSlice"; // Import actions from the slice

function First() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const navigate = useNavigate();

  // Sample categories data
  const categories = [
    {
      id: 1,
      name: "Beds",
      icon: "🛏️",
      subcategories: [
        { id: 1, name: "Wooden Beds", icon: "🪵" },
        { id: 2, name: "Metal Beds", icon: "🛠️" },
      ],
    },
    {
      id: 2,
      name: "Chairs",
      icon: "🪑",
      subcategories: [
        { id: 3, name: "Office Chairs", icon: "🖥️" },
        { id: 4, name: "Dining Chairs", icon: "🍽️" },
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <a href="/">
          <img
            className="cursor-pointer sm:h-auto sm:w-auto"
            src="./assets/images/company-logo.svg"
            alt="company logo"
          />
        </a>

        {/* Search bar */}
        <form className="items-center hidden w-2/5 border h-9 md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 mx-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            className="hidden w-11/12 outline-none md:block"
            type="search"
            placeholder="Search"
          />

          <button className="h-full px-4 ml-auto bg-amber-400 hover:bg-yellow-300">
            Search
          </button>
        </form>

        {/* Cart with Hover Section */}
        <div className="relative flex flex-col items-center justify-center cursor-pointer" onClick={toggleCart}>
          <Link to="/hovercard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs">Items {cartItems.length}</p>
          </Link>
        </div>
      </header>
      {/* /Header */}

      {/* Cart Slider */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 z-50 h-full bg-white shadow-lg w-80">
          <button onClick={toggleCart} className="absolute text-gray-600 top-4 right-4">
            Close
          </button>
          <div className="p-5">
            <h2 className="text-lg font-bold">Your Cart</h2>
            {/* Display cart items */}
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-3">
                <p>{item.name}</p>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Menu */}
      <div className="mt-10">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => handleCategorySelect(category)}
              className="flex items-center p-2 text-lg font-semibold"
            >
              {category.icon} {category.name}
            </button>
            {selectedCategory === category && (
              <ul className="ml-6">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id} className="p-2 cursor-pointer">
                    {subcategory.icon} {subcategory.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default First;
