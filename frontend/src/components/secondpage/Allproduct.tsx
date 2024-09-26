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
  type AccordionSection = 'Categories' | 'priceRange' | 'brand' | 'discount';

  const [accordionState, setAccordionState] = useState<Record<AccordionSection, boolean>>({
    Categories: true,
    priceRange: false,
    brand: false,
    discount: false,
  });

  
  const toggleAccordion = (section) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
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
      {/* Categories Accordion */}
      <div className="border-b border-slate-200">
        <div
          onClick={() => toggleAccordion('categories')}
          className="flex items-center justify-between w-full py-5 cursor-pointer text-slate-800"
        >
          <span>Categories</span>
          <span className="transition-transform duration-300 text-slate-800">
            {accordionState.categories ? '-' : '+'}
          </span>
        </div>
        {accordionState.categories && (
          <div className="pb-5 text-sm text-slate-500">
            <ul className="flex flex-wrap items-center gap-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer ${category.id ? 'font-bold' : ''}`}
                  onClick={() => dispatch(fetchProduct(category.id))}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Price Range Accordion */}
      <div className="border-b border-slate-200">
        <div
          onClick={() => toggleAccordion('priceRange')}
          className="flex items-center justify-between w-full py-5 cursor-pointer text-slate-800"
        >
          <span>Price Range</span>
          <span className="transition-transform duration-300 text-slate-800">
            {accordionState.priceRange ? '-' : '+'}
          </span>
        </div>
        {accordionState.priceRange && (
          <div className="pb-5 text-sm text-slate-500">
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
          </div>
        )}
      </div>

      {/* Brand Accordion */}
      <div className="border-b border-slate-200">
        <div
          onClick={() => toggleAccordion('brand')}
          className="flex items-center justify-between w-full py-5 cursor-pointer text-slate-800"
        >
          <span>Brand</span>
          <span className="transition-transform duration-300 text-slate-800">
            {accordionState.brand ? '-' : '+'}
          </span>
        </div>
        {accordionState.brand && (
          <div className="pb-5 text-sm text-slate-500">
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
          </div>
        )}
      </div>

      {/* Discount Accordion */}
      <div className="border-b border-slate-200">
        <div
          onClick={() => toggleAccordion('discount')}
          className="flex items-center justify-between w-full py-5 cursor-pointer text-slate-800"
        >
          <span>Discount</span>
          <span className="transition-transform duration-300 text-slate-800">
            {accordionState.discount ? '-' : '+'}
          </span>
        </div>
        {accordionState.discount && (
          <div className="pb-5 text-sm text-slate-500">
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
        )}
      </div>
    </div>
                </form>
              </div>
              <div className="flex flex-col gap-8">
  <div className="flex items-center justify-between">
    <h4 className="text-lg font-bold">Products</h4>
  </div>
  <div className="container py-10 mx-auto">
  <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
    {filteredProducts.map((product) => (
      <div key={product.id} className="flex flex-col items-center justify-between h-full p-4 border rounded-lg shadow-lg">
        
        {/* Discount Label (above the photo) */}
        {product.discount_rate > 0 && (
          <span className="px-2 py-1 mb-2 text-sm font-bold text-white bg-green-900 rounded">
            -{product.discount_rate}% OFF
          </span>
        )}

        {/* Image Section (Increased size) */}
        <div className="relative w-full">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full my-4 h-60" 
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col items-center w-full">
          <Link to={`/product/${product.id}`} className="font-semibold text-gray-800 text-md" style={{ fontFamily: 'Poppins' }}>
            {product.name}
          </Link>

          {/* Brand, Previous Price, Final Price */}
          <div className="flex justify-between w-full mt-2 text-sm text-blue-800">
            <span>{product.brand}</span>
            <span>|</span>
            <span className="line-through">{product.initial_price ? `Rs ${product.initial_price}` : '-'}</span>
            <span>|</span>
            <span>{`Rs ${product.final_price}`}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full px-4 py-2 mt-4 text-white bg-black rounded hover:bg-gray-800">
          View details
        </button>
      </div>
    ))}
  </div>
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
