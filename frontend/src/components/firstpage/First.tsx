import React, { useState } from "react";
import { Link } from "react-router-dom";

function First() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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


  function toggleCart(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

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

          <nav className="relative bg-violet-900">
            <div className="mx-auto h-12 max-w-[1200px] flex items-center">
              <div className="relative group">
                <button className="flex items-center px-4 py-2 text-white">
                  All Categories
                </button>

                <ul className="absolute left-0 z-50 hidden w-[300px] text-black bg-white shadow-lg top-full group-hover:block">
                  {categories.map((category) => (
                    <li key={category.id} className="relative group">
                      <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100">
                        <span className="mr-2">{category.icon}</span> {category.name}
                      </button>
                      {category.subcategories && (
                        <ul className="absolute left-full top-0 mt-0 ml-2 w-[250px] text-black bg-gray-100 border border-gray-300 rounded-lg shadow-lg group-hover:block hidden">
                          {category.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-200">
                                <span className="mr-2">{sub.icon}</span> {sub.name}
                                <svg
                                  className="w-4 h-4 ml-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

    <div>
        <div id="default-carousel" className="relative w-full bg-black" data-carousel="slide">
          {/* <!-- Carousel wrapper --> */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {/* <!-- Item 1 --> */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-1.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 2 --> */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-2.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 3 --> */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-3.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 4 --> */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-4.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* <!-- Item 5 --> */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-5.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          {/* <!-- Slider indicators --> */}
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 rtl:space-x-reverse">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 4"
              data-carousel-slide-to="3"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 5"
              data-carousel-slide-to="4"
            ></button>
          </div>
          {/* <!-- Slider controls --> */}
          <button
            type="button"
            className="absolute top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer start-0 group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer end-0 group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"  
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
  
        {/* Section after Carousel */}
        <section className="container flex flex-col justify-center gap-3 mx-auto my-8 lg:flex-row">
          <div className="flex flex-row items-center justify-center px-5 py-4 mx-5 border-2 border-yellow-400">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-violet-900 lg:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <button className="flex items-center px-4 py-2 text-white">
            All Categories
          </button>
            </div>
  
            <div className="flex flex-col justify-center ml-6">
              <h3 className="text-xs font-bold text-left lg:text-sm">Free Delivery</h3>
              <p className="text-xs text-center text-light lg:text-left lg:text-sm">
                Orders from $200
              </p>
            </div>
          </div>
  
          <div className="flex flex-row items-center justify-center px-5 py-4 mx-5 border-2 border-yellow-400">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-violet-900 lg:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            </div>
  
            <div className="flex flex-col justify-center ml-6">
              <h3 className="text-xs font-bold text-left lg:text-sm">Money returns</h3>
              <p className="text-xs text-left text-light lg:text-sm">30 Days guarantee</p>
            </div>
          </div>
        </section>
      </div>
        </body>
      </div>
    </>
  );
}

export default First;
