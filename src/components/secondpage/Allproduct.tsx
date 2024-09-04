import React from 'react';

function Allproduct() {
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
              <p className="text-sm text-[#808080] sm:text-base">Lorem ipsum dolor sit amet</p>
            </div>
            {/* Content */}
            <div className="grid gap-10 md:gap-12 lg:grid-cols-[300px_1fr]">
              {/* Filters */}
              <div className="mb-4 max-w-none lg:max-w-sm">
                <form name="wf-form-Filter-2" method="get" className="flex-col gap-6">
                  {/* Filters title */}
                  <div className="mb-6 flex items-center justify-between py-4 [border-bottom:1px_solid_rgb(217,_217,_217)]">
                    <h5 className="text-xl font-bold">Filters</h5>
                    <a href="#" className="text-sm">
                      <p>Clear all</p>
                    </a>
                  </div>
                  {/* Search input */}
                  <input
                    type="text"
                    className="mb-10 block h-9 min-h-[44px] w-full rounded-md border border-solid border-[#cccccc] bg-[#f2f2f7] bg-[16px_center] bg-no-repeat py-3 pl-11 pr-4 text-sm font-bold text-[#333333] [background-size:18px] [border-bottom:1px_solid_rgb(215,_215,_221)]"
                    placeholder="Search"
                    style={{
                      backgroundImage:
                        'url("https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daaa_MagnifyingGlass.svg")',
                    }}
                  />
                  {/* Categories */}
                  <div className="flex flex-col gap-6">
                    <p className="font-semibold">Categories</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daab_design.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Design</p>
                      </a>
                      <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daae_illustration.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Illustrations</p>
                      </a>
                      <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daad_icons.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Icons</p>
                      </a>
                      <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daaf_plugins.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>Plugins</p>
                      </a>
                      <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
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
                  <div className="mb-6 mt-6 h-px w-full bg-[#d9d9d9]"></div>
                  {/* Rating */}
                  <div className="flex flex-col gap-6">
                    <p className="font-semibold">Rating</p>
                    <div className="flex flex-wrap gap-2 lg:justify-between">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className={`flex h-9 w-14 cursor-pointer items-center justify-center rounded-md border border-solid border-[#cccccc] ${
                            index === 1 ? 'bg-black text-white' : 'bg-[#f2f2f7]'
                          } text-sm font-semibold`}
                        >
                          <span>{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="mb-6 mt-6 h-px w-full bg-[#d9d9d9]"></div>
                  {/* Filter One */}
                  <div className="flex flex-col gap-6">
                    <div className="flex cursor-pointer items-center justify-between py-4 [border-top:1px_solid_rgba(0,_0,_0,_0)] md:py-0">
                      <p className="font-semibold">Filter One</p>
                      <a href="#" className="inline-block text-sm text-black">
                        <p>Clear</p>
                      </a>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[...Array(5)].map((_, index) => (
                        <label key={index} className="flex items-center text-sm font-medium">
                          <div className="mr-3 h-5 w-5 cursor-pointer rounded-sm border border-solid bg-[#f2f2f7]"></div>
                          <span className="inline-block cursor-pointer">Option {index + 1}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="mb-6 mt-6 h-px w-full bg-[#d9d9d9]"></div>
                  {/* Filter Two */}
                  <div className="flex flex-col gap-6">
                    <div className="flex cursor-pointer items-center justify-between py-4 [border-top:1px_solid_rgba(0,_0,_0,_0)] md:py-0">
                      <p className="font-semibold">Filter Two</p>
                      <a href="#" className="inline-block text-sm text-black">
                        <p>Clear</p>
                      </a>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[...Array(6)].map((_, index) => (
                        <label key={index} className="flex items-center font-medium">
                          <div className="mr-3 mt-1 h-5 w-5 rounded-full border border-solid border-[#cccccc] bg-[#f2f2f7]"></div>
                          <span className="inline-block cursor-pointer">Option {index === 0 ? 'All' : `Option ${index}`}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              {/* Products */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Product Card */}
                <div className="p-2 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
                  <img
                    src="/path/to/image2.jpg" // Replace with actual image paths
                    alt="Purple Chair"
                    className="object-cover w-full h-40 mb-3 rounded"
                  />
                  <h3 className="text-lg font-semibold text-center">PURPLE CHAIR</h3>
                  <p className="mt-1 font-bold text-center text-violet-900">
                    $45.00 <span className="ml-2 text-sm text-gray-500 line-through">$500.00</span>
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    {/* Ratings */}
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <p className="ml-1 text-sm text-gray-400">(38)</p>
                  </div>
                  <button className="w-full py-2 mt-4 text-white rounded bg-violet-900">Add to cart</button>
                </div>
                {/* Add more product cards as needed */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Allproduct;
