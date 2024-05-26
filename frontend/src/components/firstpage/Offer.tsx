
import { Link } from 'react-router-dom';
const products = [
  { id: 1, name: "CHAIR", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 2, name: "SOFA", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 3, name: "GUYER KITCHEN", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 4, name: "GUYER ROOM", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 5, name: "BEDROOM", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 6, name: "LIVING GUYER", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 7, name: "STREET CHAIR", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
  { id: 8, name: "WHITE SOFA", price: 45, originalPrice: 500, imageUrl: "https://via.placeholder.com/200", rating: 4 },
];
const Offer = () => {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Recommended for You</h2>
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
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">
                ${product.price.toFixed(2)} <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </p>
              <div className="flex items-center mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.897c.969 0 1.371 1.24.588 1.81l-3.957 2.868a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.957-2.868a1 1 0 00-1.175 0l-3.957 2.868c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.456 9.1c-.783-.57-.38-1.81.588-1.81h4.897a1 1 0 00.95-.69L9.049 2.927z" />
                  </svg>
                ))}
              </div>
              <Link to="/productview">
              <button className="w-full py-2 mt-4 text-white bg-purple-700 rounded hover:bg-purple-800">
                Add to cart
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Offer;