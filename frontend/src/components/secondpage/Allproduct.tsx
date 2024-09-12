import { Link } from "react-router-dom";
function Allproduct() {
  const products = [
    {
      id: 1,
      name: 'Purple Chair',
      price: 45.0,
      originalPrice: 500.0,
      imageUrl: 'https://via.placeholder.com/200', // Replace with actual image path
      rating: 4,
      reviews: 38,
    },
    {
      id: 2,
      name: 'Green Sofa',
      price: 150.0,
      originalPrice: 300.0,
      imageUrl: 'https://via.placeholder.com/200', // Replace with actual image path
      rating: 5,
      reviews: 50,
    },
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
                        <p>Price : Lower To Higher</p>
                      </a>
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daae_illustration.svg"
                          alt=""  
                          className="inline-block"
                        />
                                                <p>Price : Higher To Lower</p>
                      </a>
                      <a href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                        <img
                          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daae_illustration.svg"
                          alt=""
                          className="inline-block"
                        />
                        <p>   </p>
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
              <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Filter Products</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="relative overflow-hidden bg-white rounded-lg shadow-md group">
            <div className="relative">
              <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-48" />
              <span className="absolute px-2 py-1 text-sm font-bold text-white bg-yellow-400 rounded top-2 right-2">
                - 25% OFF
              </span>

              {/* Hover icons */}
              <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                  {/* Magnifying glass icon (eye) */}
                  <Link to="/productview">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-3.5-3.5m0 0A5.5 5.5 0 1115 19zm0 0L21 21" />
                    </svg>
                  </Link>
                </button>
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                  {/* Heart icon */}
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.568a4.5 4.5 0 010-6.364z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">
                ${product.price.toFixed(2)} <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </p>
              <div className="flex items-center mt-2">

              </div>
              <Link to="/checkout">
                <button className="w-full py-2 mt-4 text-white bg-purple-700 rounded hover:bg-purple-800">
                  Add to cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>



            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Allproduct;
