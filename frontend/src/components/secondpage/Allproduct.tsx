import React from 'react';

function Allproduct() {
  const products = [
    {
      name: 'Purple Chair',
      price: 45.0,
      originalPrice: 500.0,
      image: '/path/to/image2.jpg', // Replace with actual image path
      rating: 4,
      reviews: 38,
    },
    {
      name: 'Green Sofa',
      price: 150.0,
      originalPrice: 300.0,
      image: '/path/to/image3.jpg', // Replace with actual image path
      rating: 5,
      reviews: 50,
    },
    // Add more products as needed
  ];

  return (
    <div>
      <section>
        {/* Container */}
        <div className="w-full px-5 py-16 mx-auto md:px-10 md:py-24">
          {/* Component */}
          <div className="flex flex-col gap-12">
            {/* Title */}
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-bold md:text-5xl">Filter products</h3>
              <p className="text-sm text-gray-500 sm:text-base">Lorem ipsum dolor sit amet</p>
            </div>
            {/* Content */}
            <div className="grid gap-10 md:gap-12 lg:grid-cols-[300px_1fr]">
              {/* Filters */}
              <div className="mb-4 max-w-none lg:max-w-sm">
                <form name="wf-form-Filter-2" method="get" className="flex-col gap-6">
                  {/* Filters title */}
                  <div className="flex items-center justify-between py-4 mb-6 border-b border-gray-300">
                    <h5 className="text-xl font-bold">Filters</h5>
                    <a href="#" className="text-sm">
                      <p>Clear all</p>
                    </a>
                  </div>
                  {/* Search input */}
                  <input
                    type="text"
                    className="block w-full py-3 pr-4 mb-10 text-sm font-bold text-gray-800 bg-gray-100 border border-gray-300 border-solid rounded-md h-9 pl-11"
                    placeholder="Search"
                    style={{
                      backgroundImage:
                        'url("https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daaa_MagnifyingGlass.svg")',
                      backgroundSize: '18px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '16px center',
                    }}
                  />
                  {/* Categories */}
                  <div className="flex flex-col gap-6">
                    <p className="font-semibold">Categories</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daab_design.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Design</p>
                      </a>
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daae_illustration.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Illustrations</p>
                      </a>
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daad_icons.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Icons</p>
                      </a>
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daaf_plugins.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Plugins</p>
                      </a>
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daac_color%20palette.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Color Palette</p>
                      </a>
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="w-full h-px mt-6 mb-6 bg-gray-300"></div>
                  {/* Rating */}
                  <div className="flex flex-col gap-6">
                    <p className="font-semibold">Rating</p>
                    <div className="flex flex-wrap gap-2 lg:justify-between">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className={`flex h-9 w-14 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-300 ${
                            index === 1 ? 'bg-black text-white' : 'bg-gray-100'
                          } text-sm font-semibold`}
                        >
                          <span>{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="w-full h-px mt-6 mb-6 bg-gray-300"></div>
                  {/* Filter One */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between py-4 border-t border-transparent cursor-pointer md:py-0">
                      <p className="font-semibold">Filter One</p>
                      <a href="#" className="inline-block text-sm text-black">
                        <p>Clear</p>
                      </a>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[...Array(5)].map((_, index) => (
                        <label key={index} className="flex items-center text-sm font-medium">
                          <div className="w-5 h-5 mr-3 bg-gray-100 border border-solid rounded-sm cursor-pointer"></div>
                          <span className="inline-block cursor-pointer">Option {index + 1}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="w-full h-px mt-6 mb-6 bg-gray-300"></div>
                  {/* Filter Two */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between py-4 border-t border-transparent cursor-pointer md:py-0">
                      <p className="font-semibold">Filter Two</p>
                      <a href="#" className="inline-block text-sm text-black">
                        <p>Clear</p>
                      </a>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[...Array(6)].map((_, index) => (
                        <label key={index} className="flex items-center font-medium">
                          <div className="w-5 h-5 mt-1 mr-3 bg-gray-100 border border-gray-300 border-solid rounded-full"></div>
                          <span className="inline-block cursor-pointer">Option {index === 0 ? 'All' : `Option ${index}`}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              {/* Products */}
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
  {/* Product Cards */}
  {products.map((product, index) => (
    <div
      key={index}
      className="max-w-xs p-2 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg min-h-60"  // Added min-h-60 for height control
    >
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-32 mb-3 rounded" // Adjust the image height here
      />
      <h3 className="text-sm font-semibold text-center">{product.name}</h3>
      <p className="mt-1 text-sm text-center text-violet-900">
        ${product.price.toFixed(2)} <span className="ml-2 text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
      </p>
      <div className="flex items-center justify-center mt-1">
        {/* Ratings */}
        {[...Array(product.rating)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3 text-yellow-400"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        ))}
        <p className="ml-1 text-xs text-gray-400">({product.reviews})</p>
      </div>
      <button className="w-full py-2 mt-2 text-xs text-white rounded bg-violet-900 hover:bg-violet-700">
        Add to cart
      </button>
    </div>
  ))}
</div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Allproduct;
