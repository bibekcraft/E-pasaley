import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../slice/ProductSlice';
import { fetchCategories } from '../slice/CategorySlice';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch } from '../store/Store';
import { RootState } from '../store/Store';
export interface Product {
  final_price: number;
  id: number;
  name: string;
  image: string | undefined;
  initial_price: number;
  discount_rate: number;
  brand: string;
  categoryId: number;
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
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : null;

  const { products, status: productStatus } = useSelector((state: RootState) => state.product);
  const { categories, status: categoryStatus } = useSelector((state: RootState) => state.categories) as { categories: Category[], status: string };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryIdNumber) {
      dispatch(fetchProduct(categoryIdNumber));
    }
  }, [dispatch, categoryIdNumber]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const isWithinPriceRange = product.final_price >= minPrice && product.final_price <= maxPrice;
      const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDiscount = selectedDiscount
        ? (selectedDiscount === 'all' && product.discount_rate < 100) ||
          (selectedDiscount === 'below 10%' && product.discount_rate < 10) ||
          (selectedDiscount === 'below 20%' && product.discount_rate < 20) ||
          (selectedDiscount === 'below 30%' && product.discount_rate < 30) ||
          (selectedDiscount === '30% and more' && product.discount_rate >= 30)
        : true;
      return isWithinPriceRange && matchesBrand && matchesSearchTerm && matchesDiscount;
    });
  }, [products, minPrice, maxPrice, selectedBrand, searchTerm, selectedDiscount]);

  if (productStatus === 'loading' || categoryStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (productStatus === 'failed' || categoryStatus === 'failed') {
    return <p>Error fetching data. Please try again later.</p>;
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
                    <button
                      type="button"
                      className="text-sm"
                      onClick={() => {
                        setSearchTerm('');
                        setMinPrice(0);
                        setMaxPrice(1000000);
                        setSelectedBrand('');
                        setSelectedDiscount(null);
                        dispatch(fetchProduct(categoryIdNumber || 1));
                      }}
                    >
                      Clear all
                    </button>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full py-3 pr-4 mb-10 text-sm font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                    placeholder="Search"
                  />
                  <div className="flex flex-col gap-6 p-6 font-poppins">
                    <p className="text-lg font-semibold ">Categories</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <ul>
                        {categories.map((category) => (
                          <li
                            key={category.id}
                            className={`cursor-pointer ${categoryIdNumber === category.id ? 'font-bold' : ''}`}
                            onClick={() => dispatch(fetchProduct(category.id))}
                          >
                            {category.name}
                          </li>
                        ))}
                      </ul>
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
                            onChange={() => setSelectedDiscount(range)}
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
                      </div>
                      <div className="mt-2 text-gray-800">
                      <Link to={`/product/${product.id}`} className="font-bold">                          {product.name}
                        </Link>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">Rs {product.final_price}</span>
                          {product.initial_price && (
                            <span className="text-gray-400 line-through">
                              Rs {product.initial_price}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
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
