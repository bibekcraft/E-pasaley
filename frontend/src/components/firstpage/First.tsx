import React, { useState } from "react";
import { Link } from "react-router-dom";

function First() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    {
      id: 1,
      name: 'Beds',
      icon: '🛏️',
      subcategories: [
        { id: 1, name: 'Wooden Beds', icon: '🪵' },
        { id: 2, name: 'Metal Beds', icon: '🛠️' }
      ]
    },
    {
      id: 2,
      name: 'Chairs',
      icon: '🪑',
      subcategories: [
        { id: 3, name: 'Office Chairs', icon: '🖥️' },
        { id: 4, name: 'Dining Chairs', icon: '🍽️' }
      ]
    }
  ]

  // Function to select a category
  const handleCategorySelect = (category: React.SetStateAction<string | null>) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <div>
        <head>
          <title>MayBell - Online furniture store</title>
        </head>

        <body x-data="{ desktopMenuOpen: false, mobileMenuOpen: false}">
          {/* Header */}
          <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
            <a href="index.html">
              <img
                className="cursor-pointer sm:h-auto sm:w-auto"
                src="./assets/images/company-logo.svg"
                alt="company logo"
              />
            </a>

            <div className="md:hidden">
              <button onClick={() => {}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

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

            <div className="hidden gap-3 md:!flex">
              {/* Wishlist */}
              <a
                href="wishlist.html"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <p className="text-xs">Wishlist</p>
              </a>

              {/* Cart with Hover Section */}
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer group"
                onClick={toggleCart}
              >
                <a>
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
                  <Link to="/hovercard">
                    <p className="text-xs">Cart</p>
                  </Link>
                </a>

                {/* Hover Content */}

              </div>

              {/* Account */}
              <a
                href="/login"
                className="relative flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="absolute bottom-[33px] right-1 flex h-2 w-2">
                  <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <p className="text-xs">Account</p>
              </a>
            </div>
          </header>
          {/* /Header */}

          {/* Cart Slider */}
          {isCartOpen && (
            <div className="fixed top-0 right-0 z-50 h-full bg-white shadow-lg w-80">
              <button
                onClick={toggleCart}
                className="absolute text-gray-600 top-4 right-4"
              >
                Close
              </button>
              {/* Your cart items and details go here */}
              <div className="p-5">
                <h2 className="text-lg font-bold">Your Cart</h2>
                {/* Cart items */}
                <div className="mt-5">
                  {/* Example item */}
                  <div className="flex items-center justify-between mb-3">
                    <p>Item 1</p>
                    <span>$10.00</span>
                  </div>
                  {/* Add more items as needed */}
                </div>
                <div className="mt-5">
                  <button className="w-full py-2 bg-amber-400 hover:bg-green-600">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Burger menu  */}
          <section
            className="absolute left-0 right-0 z-50 w-full h-screen bg-white"
            style={{ display: "none" }}
          >
            {/* Content for the burger menu */}
          </section>
          {/* /Burger menu */}

          {/* Nav bar */}
          {/* hidden on small devices */}



        </body>
      </div>
    </>
  );
}

export default First;