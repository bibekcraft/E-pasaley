import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/Store';
import { addItem } from '../slice/cartSlice'; 
import Faq from '../resources/Faq';
import Second from '../firstpage/Second';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../firstpage/Footer';
import First from 'components/firstpage/First';
const TestView: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    // Fetch product details if not available
    // dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const product = products.find((p) => p.id === Number(productId));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({
        ...product, id: product.id.toString(),
        quantity: 0
      }));
      toast.success('Item has been added to the cart.');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <Second />
      <div className="w-full h-full p-6">
        <ToastContainer />
        {/* Product Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Side: Image Section */}
          <div className="flex flex-col items-center justify-center space-x-8 md:flex-row md:items-start">
            {/* Thumbnail Images */}
            <div className="flex flex-row space-x-6 md:flex-col md:space-x-0 md:space-y-6">
              <img
                className="w-20 h-20 transition-all duration-300 border-2 border-green-400 rounded-lg sm:w-28 sm:h-28 hover:border-green-600"
                src={product.image1}
                alt="Thumbnail 1"
              />
              <img
                className="w-20 h-20 transition-all duration-300 border-2 border-green-400 rounded-lg sm:w-28 sm:h-28 hover:border-green-600"
                src={product.image2}
                alt="Thumbnail 2"
              />
              <img
                className="w-20 h-20 transition-all duration-300 border-2 border-green-400 rounded-lg sm:w-28 sm:h-28 hover:border-green-600"
                src={product.image3}
                alt="Thumbnail 3"
              />
            </div>

            {/* Main Product Image */}
            <div className="flex justify-center border-green-400 rounded-lg ">
              <img
                className="w-[15rem] md:w-[25rem] h-auto rounded-lg"
                src={product.image}
                alt="Product"
              />
            </div>
          </div>

          {/* Right Side: Details Section */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">{product.name}</h2>
            <p className="mt-4 text-lg font-semibold text-gray-700 md:text-xl">
              {product.brand}
            </p>
            <p className="mt-2 text-sm text-gray-500">Item #: {product.itemnumber}</p>
            {/* Pricing Section */}
            <div className="mt-8">
              <p className="text-2xl font-bold text-black md:text-3xl">
                {product.final_price}
                <span className="ml-2 text-red-500 line-through">{product.initial_price}</span>
              </p>
              <p className="text-sm text-green-600">You Save: {product.discount}</p>
            </div>

            {/* Buttons Section */}
            <div className="flex mt-10 space-x-4">
              <button
                className="flex items-center px-8 py-4 text-white bg-green-700 rounded-md md:px-10"
                onClick={handleAddToCart}
              >
                <span className="mr-2">🛒</span> ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Product Description and Features Section */}
        <div className="p-6 mt-12 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Product Details</h3>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="text-yellow-500">✔️</span> {product.description}
            </p>
          </div>

          {/* Features Table */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">Features:</h4>
            <table className="w-full mt-4 text-sm text-left border">
              <tbody>
                <tr className="border-t">
                  <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">Feature</th>
                  <td className="px-4 py-2">{product.feature}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Faq/>
      </div>
      <Footer />
    </div>
  );
};

export default TestView;
