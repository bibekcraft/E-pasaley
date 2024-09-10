import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const TopArraival = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-5">
      <h2 className="mb-5 text-2xl font-bold text-center">TOP NEW ARRIVAL</h2>

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
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
            <img
              src="/path/to/image1.jpg" // Replace with actual image paths
              alt="Guyer Chair"
              className="object-cover w-full h-40 mb-3 rounded"
            />
                          <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                  {/* Magnifying glass icon (eye) */}
                  <Link to="/productview">  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <h3 className="text-lg font-semibold text-center">GUYER CHAIR</h3>
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
        </SplideSlide>

        {/* Product 2 */}
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>

        {/* Product 3 */}
        <SplideSlide>
          {/* Repeat similar structure for other products */}
          {/* Example below for Product 3 */}
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
            <img
              src="/path/to/image3.jpg" // Replace with actual image paths
              alt="Large Sofa"
              className="object-cover w-full h-40 mb-3 rounded"
            />
            <h3 className="text-lg font-semibold text-center">LARGE SOFA</h3>
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
        </SplideSlide>
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>
        <SplideSlide>
          <div className="p-4 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-lg">
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
        </SplideSlide>

        {/* Add more SplideSlide components as needed for other products */}
        
      </Splide>
    </section>
  );
};

export default TopArraival;
