
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
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <span className="absolute top-2 right-2 bg-yellow-400 text-white text-sm font-bold px-2 py-1 rounded">
                - 25% OFF
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">
                ${product.price.toFixed(2)} <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </p>
              <div className="flex items-center mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.897c.969 0 1.371 1.24.588 1.81l-3.957 2.868a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.957-2.868a1 1 0 00-1.175 0l-3.957 2.868c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.456 9.1c-.783-.57-.38-1.81.588-1.81h4.897a1 1 0 00.95-.69L9.049 2.927z" />
                  </svg>
                ))}
              </div>
              <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
                Add to cart
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
