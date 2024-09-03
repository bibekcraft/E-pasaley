import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const TopArraival = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-5">
      <h2 className="text-center text-2xl font-bold mb-5">TOP NEW ARRIVAL</h2>

      <Splide
        options={{
          perPage: 4,
          rewind: true,
          gap: '1rem',
          pagination: false,
          arrows: true,
        }}
      >
        {/* Product 1 */}
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image1.jpg" // Replace with actual image paths
              alt="Guyer Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">GUYER CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>

        {/* Product 2 */}
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>

        {/* Product 3 */}
        <SplideSlide>
          {/* Repeat similar structure for other products */}
          {/* Example below for Product 3 */}
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image3.jpg" // Replace with actual image paths
              alt="Large Sofa"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">LARGE SOFA</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="/path/to/image2.jpg" // Replace with actual image paths
              alt="Purple Chair"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-center text-lg font-semibold">PURPLE CHAIR</h3>
            <p className="text-center text-violet-900 font-bold mt-1">
              $45.00 <span className="text-sm text-gray-500 line-through ml-2">$500.00</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              {/* Ratings */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <p className="text-sm text-gray-400 ml-1">(38)</p>
            </div>
            <button className="mt-4 w-full bg-violet-900 text-white py-2 rounded">Add to cart</button>
          </div>
        </SplideSlide>

        {/* Add more SplideSlide components as needed for other products */}
        
      </Splide>
    </section>
  );
};

export default TopArraival;
