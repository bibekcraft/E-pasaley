// src/components/ProductDetail.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/Store';
import { addItem } from '../slice/cartSlice'; // Import the addItem action
import First from '../firstpage/First';
import { Link } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    // You might want to dispatch an action to fetch the product details here
    // if you're not getting all products initially
    // dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  // Find the product by ID
  const product = products.find((p) => p.id === Number(productId));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({
        ...product, id: product.id.toString(),
        quantity: 0
      })); // Dispatch addItem with the product and convert id to string
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <First />
      <div className="container p-4 mx-auto">
        <div className="flex flex-col md:flex-row">
          <img src={product.image} alt={product.name} className="object-cover w-full h-auto md:w-1/2" />
          <div className="md:ml-4">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="mt-2 text-lg text-gray-700">Brand: {product.brand}</p>
            <p className="text-lg font-semibold">Price: Rs {product.final_price}</p>
            {product.initial_price && (
              <p className="text-gray-400 line-through">Rs {product.initial_price}</p>
            )}
            {product.discount_rate > 0 && (
              <p className="text-yellow-500">Discount: -{product.discount_rate}%</p>
            )}
            <p className="mt-4">Feature:</p>
            <p className="text-gray-600">{product.feature}</p>
            <p className="mt-4">Description:</p>
            <p className="text-gray-600">{product.description}</p>
            <button
              onClick={handleAddToCart} // Add click handler here
              className="px-4 py-2 mt-4 text-white rounded bg-violet-900"
            >
              Add to Cart
            </button>

            <Link to='/checkout'>
              <button
                className="px-4 py-2 mt-4 text-white rounded bg-violet-900"
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
