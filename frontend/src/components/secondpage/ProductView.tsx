import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';  // assuming you are using axios for API calls

function ProductView() {
  const { categoryId, id } = useParams(); // Get both categoryId and productId from route params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the product based on categoryId and productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/categories/${categoryId}/products/${id}`);
        setProduct(response.data);  // assuming response.data contains product info
      } catch (error) {
        console.error("Error fetching the product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categoryId, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl p-4 font-sans tracking-wide lg:max-w-6xl max-lg:mx-auto">
      <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="text-center lg:col-span-3">
          <div className="lg:h-[450px] p-4 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
            <img src={product.image} alt={product.name} className="object-contain object-top w-full h-full rounded lg:w-11/12" />
          </div>
          <div className="flex flex-wrap gap-4 mx-auto mt-4">
            {product.image1 && product.image1.map((image, index) => (
              <div key={index} className="relative p-1 cursor-pointer before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img src={image} alt={`Product Thumbnail ${index}`} className="object-contain w-20 h-16" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 md:gap-12">
            <button type="button" className="inline-block px-8 py-4 text-sm font-medium text-white transition bg-black rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
              Add to Cart
            </button>
            <Link to="/shop" className="inline-block px-8 py-4 text-sm font-medium text-black transition border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
