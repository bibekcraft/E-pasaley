  
  
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../slice/ProductSlice';
import { fetchCategories } from '../slice/CategorySlice';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../store/Store';
import { RootState } from '../store/Store';
import { useParams } from 'react-router-dom';

export interface Product {
  final_price: number;
  id: number;
  name: string;
  imageUrl: string;
  initial_price: number;
  discount_rate: number; // New field
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

const AllProducts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { categoryId } = useParams<{ categoryId: string }>(); // Get category ID from URL params

  const { products, status: productStatus, error: productError } = useSelector((state: RootState) => state.product);
  const { categories, status: categoryStatus, error: categoryError } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProduct(parseInt(categoryId)));
    } else {
      dispatch(fetchProduct(1)); // Default or specific fetch
    }
    dispatch(fetchCategories());
  }, [dispatch, categoryId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (productStatus === 'loading' || categoryStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (productStatus === 'failed') {
    return <p>Error fetching products: {productError}</p>;
  }

  if (categoryStatus === 'failed') {
    return <p>Error fetching categories: {categoryError}</p>;
  }

  return (
    <div>
      <section>
        <div className="w-full px-5 py-16 mx-auto md:px-10 md:py-24">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-bold md:text-5xl">Filter products</h3>
              <p className="text-sm text-gray-500 sm:text-base">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="grid gap-10 md:gap-12 lg:grid-cols-[300px_1fr]">
              <div className="mb-4 max-w-none lg:max-w-sm">
                <form name="wf-form-Filter-2" method="get" className="flex-col gap-6">
                  <div className="flex items-center justify-between py-4 mb-6 border-b border-gray-300">
                    <h5 className="text-xl font-bold">Filters</h5>
                    <a href="#" className="text-sm"><p>Clear all</p></a>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="block w-full py-3 pr-4 mb-10 text-sm font-bold text-gray-800 bg-gray-100 border border-gray-300 border-solid rounded-md h-9 pl-11"
                    placeholder="Search"
                    style={{
                      backgroundImage: 'url("https://assets.website-files.com/6458c625291a94a195e6cf3a/64b7a3a33cd5dc368f46daaa_MagnifyingGlass.svg")',
                      backgroundSize: '18px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '16px center',
                    }}
                  />
                  <div className="flex flex-col gap-6">
                    <p className="font-semibold">Categories</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {categories.map((category: Category) => (
                        <a key={category.id} href="#" className="flex gap-3 p-3 font-semibold bg-gray-100 rounded-md">
                          <img src={category.imageUrl} alt={category.name} className="inline-block" />
                          {/* <p>{category.name}</p> */}
                        </a>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Filter Products</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {filteredProducts.map((product: Product) => {
                    // Calculate discount rate
                    const discountRate = ((product.initial_price - product.final_price) / product.initial_price) * 100;

                    return (
                      <div key={product.id} className="relative overflow-hidden bg-white rounded-lg shadow-md group">
                        <div className="relative">
                          <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-48" />
                          <span className="absolute px-2 py-1 text-sm font-bold text-white bg-yellow-400 rounded top-2 right-2">
                            {discountRate.toFixed(0)}% OFF
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                              <Link to={`/allproducts/${categoryId}`}>
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-3.5-3.5m0 0A5.5 5.5 0 1115 19zm0 0L21 21" />
                                </svg>
                              </Link>
                            </button>
                            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.568a4.5 4.5 0 010-6.364z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold">{product.name}</h3>
                          <p className="text-gray-500">
                            Rs {product.final_price} <span className="line-through">Rs {product.initial_price}</span>
                          </p>
                          <Link to={`/checkout`}>
                            <button className="w-full py-2 mt-4 text-white bg-purple-700 rounded hover:bg-purple-800">
                              Add to cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
