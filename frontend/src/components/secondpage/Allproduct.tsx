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
  image: string | undefined;
  initial_price: number;
  discount_rate: number;
  brand: string;
  rating: number;
  categoryId: number; // Ensure this is included in the product type
}

export interface Category {
  id: number;
  name: string;
  image: string | undefined;
}

const AllProducts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { categoryId } = useParams<{ categoryId: string }>();

  const { products, status: productStatus, error: productError } = useSelector((state: RootState) => state.product);
  const { categories, status: categoryStatus, error: categoryError } = useSelector((state: RootState) => state.categories) as { categories: Category[], status: string, error: string | null };

  useEffect(() => {
    dispatch(fetchCategories());
    if (categoryId) {
      const categoryIdNumber = parseInt(categoryId, 10);
      setSelectedCategory(categoryIdNumber);
      dispatch(fetchProduct(categoryIdNumber));
    } else {
      dispatch(fetchProduct(1)); // Default fetch
    }
  }, [dispatch, categoryId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    dispatch(fetchProduct(categoryId));
  };
  const handleDiscountChange = (discountRange: string) => {
    setSelectedDiscount(discountRange);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(1000000);
    setSelectedBrand('');
    setSelectedDiscount(null);
    setSelectedCategory(null);
    dispatch(fetchProduct(1)); // Reset to default fetch
  };

  const filteredProducts = products.filter(product => {
    const discountRate = ((product.initial_price - product.final_price) / product.initial_price) * 100;
    const isWithinPriceRange = product.final_price >= minPrice && product.final_price <= maxPrice;
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiscount = selectedDiscount
      ? (selectedDiscount === 'all' && discountRate < 100) ||
        (selectedDiscount === 'below 10%' && discountRate < 10) ||
        (selectedDiscount === 'below 20%' && discountRate < 20) ||
        (selectedDiscount === 'below 30%' && discountRate < 30) ||
        (selectedDiscount === '30% and more' && discountRate >= 30)
      : true;
    const matchesCategory = selectedCategory !== null ? product.categoryId === selectedCategory : true;
  
    return isWithinPriceRange && matchesBrand && matchesSearchTerm && matchesDiscount && matchesCategory;
  });
  
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
              <p className="text-sm text-gray-500 sm:text-base">Find the best products for you</p>
            </div>
            <div className="grid gap-10 md:gap-12 lg:grid-cols-[300px_1fr]">
              <div className="mb-4 max-w-none lg:max-w-sm">
                <form className="flex-col gap-6">
                  <div className="flex items-center justify-between py-4 mb-6 border-b border-gray-300">
                    <h5 className="text-xl font-bold">Filters</h5>
                    <a
                      href="#"
                      className="text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        clearFilters();
                      }}
                    >
                      <p>Clear all</p>
                    </a>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="block w-full py-3 pr-4 mb-10 text-sm font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                    placeholder="                                Search"
                    style={{
                      backgroundSize: '18px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '16px center',
                    }}
                  />
                  <div className="flex flex-col gap-6 p-6 font-poppins">
                    <p className="text-lg font-semibold text-gray-800">Categories</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {categories.map((category) => (
                        <button
                          type="button"
                          key={category.id}
                          className={`flex items-center gap-2 ${selectedCategory === category.id ? 'text-green-500' : 'text-gray-700'}`}
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Price Range</p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="range"
                        min="0"
                        max={Math.max(...products.map(product => product.final_price), 1000000)}
                        value={minPrice}
                        onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        className="w-full bg-gray-200"
                      />
                      <input
                        type="range"
                        min="0"
                        max={Math.max(...products.map(product => product.final_price), 1000000)}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full bg-gray-200"
                      />
                      <p className="text-gray-700">Price: Rs {minPrice} - Rs {maxPrice}</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Brand</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {Array.from(new Set(products.map(product => product.brand))).map((brand) => (
                        <label key={brand} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="brand"
                            value={brand}
                            onChange={() => setSelectedBrand(brand)}
                            checked={selectedBrand === brand}
                            className="mr-2"
                          />
                          <span>{brand}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Discount</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {['all', 'below 10%', 'below 20%', 'below 30%', '30% and more'].map((range) => (
                        <label key={range} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="discount"
                            value={range}
                            onChange={() => handleDiscountChange(range)}
                            checked={selectedDiscount === range}
                            className="mr-2"
                          />
                          <span>{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold">Products</h4>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="relative p-4 bg-white rounded shadow-md group">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-48"
                        />
                        {product.discount_rate > 0 && (
                          <span className="absolute px-2 py-1 text-sm font-bold text-white bg-yellow-400 rounded top-2 right-2">
                            -{product.discount_rate}% OFF
                          </span>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                          <Link to={`/productview/${product.id}`} className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-3.5-3.5m0 0A5.5 5.5 0 1115 19zm0 0L21 21" />
                            </svg>
                          </Link>
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
};

export default AllProducts;
