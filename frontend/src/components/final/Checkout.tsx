import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { removeItemFromCart } from '../slice/cartSlice';
import { setQuantities } from '../slice/orderSlice';
import { validateCoupon, reset } from '../slice/CouponSlice';
import CategorySection from '../firstpage/CategorySection';
import { RootState } from '../store/Store';

import LoadingScreen from '../modal/LoadingScreen';

interface Product {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  brand: string;
  final_price: number;
  quantity: number;
}

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantities = useSelector((state: RootState) => state.order.quantities);
  const { discount, status, error } = useSelector((state: RootState) => state.coupons);
  
  const location = useLocation();
  const state = location.state as { products: Product[]; totalCost: number; quantities: number[] };

  const [couponCode, setCouponCode] = useState('');

  // Log the received state for verification
  useEffect(() => {
    console.log('Products passed to Checkout:', state?.products);
    console.log('Total Cost:', state?.totalCost);
  }, [state]);

  // Handle quantity change
  const handleQuantityChange = (index: number, quantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity; // Update quantity for the specific item
    dispatch(setQuantities(newQuantities)); // Dispatch new quantities to Redux
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  // Group items and calculate total prices
  const groupedItems = cartItems.map((item, index) => ({
    ...item,
    totalPrice: (item.final_price || 0) * (quantities[index] || 1),
  }));

  const totalPrice = groupedItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  const totalWithDiscount = totalPrice - (discount || 0);
  const shippingCost = 100;
  const exactFinalCost = totalWithDiscount + shippingCost;

  // Handle applying the coupon
  const handleApplyCoupon = () => {
    if (couponCode) {
      dispatch(validateCoupon(couponCode));
    }
  };

  // Reset coupon state on unmount
  useEffect(() => {
    return () => {
      dispatch(reset());
    };

  }, [dispatch]);

  
  if (status === 'idle' || status === 'loading') {
    return     <LoadingScreen />;

  }

  return (
    <div>
      <CategorySection />
      <div className="container mx-auto mt-10">
        <div className="my-10 shadow-md sm:flex">
          <div className="w-full px-10 py-10 bg-white sm:w-3/4">
            <div className="flex justify-between pb-8 border-b">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <h2 className="text-2xl font-semibold">{groupedItems.length} Items</h2>
            </div>

            {groupedItems.map((item, index) => (
              <div key={item.id} className="items-stretch py-8 border-t md:flex md:py-10 lg:py-8 border-gray-50">
                <div className="w-full md:w-4/12 2xl:w-1/4">
                  <img src={item.image} alt={item.name} className="object-cover object-center w-full h-full" />
                </div>
                <div className="flex flex-col justify-center md:pl-3 md:w-8/12 2xl:w-3/4">
                  <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                  <div className="flex items-center justify-between w-full">
                    <select
                      value={quantities[index] || 1}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      aria-label="Select quantity"
                      className="px-1 py-2 mr-6 border border-gray-200"
                    >
                      {/* Populate select options for 1-10 */}
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <p className="text-base font-black leading-none text-gray-800">Rs {item.totalPrice}</p>
                  </div>
                  <p className="text-xs leading-3 text-gray-600">Brand: {item.brand}</p>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-xs leading-3 text-gray-800 underline cursor-pointer">Add to favorites</p>
                    <p
                      onClick={() => handleRemoveItem(item.id)}
                      className="pl-5 text-xs leading-3 text-red-500 underline cursor-pointer"
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>

          <div id="summary" className="w-full px-8 py-10 sm:w-1/4 md:w-1/2">
            <h1 className="pb-8 text-2xl font-semibold border-b">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="text-sm font-semibold uppercase">Items {groupedItems.length}</span>
              <span className="text-sm font-semibold">Rs {totalPrice}</span>
            </div>
            <div>
              <label className="inline-block mb-3 text-sm font-medium uppercase">Shipping</label>
              <select className="block w-full p-2 text-sm text-gray-600">
                <option>Standard shipping - Rs {shippingCost}</option>
              </select>
            </div>
            <div className="py-10">
              <label className="inline-block mb-3 text-sm font-semibold uppercase">Promo Code</label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300"
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              className="px-5 py-2 text-sm text-white uppercase bg-red-500 hover:bg-red-600"
              disabled={status === 'loading'}
            >
              Apply
            </button>

            {status === 'loading' && <p className="text-sm text-gray-500">Validating coupon...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {discount > 0 && (
              <div className="flex justify-between mt-5 text-sm font-semibold uppercase">
                <span>Discount Applied</span>
                <span className="text-green-500">- Rs {discount}</span>
              </div>
            )}

            <div className="mt-8 border-t">
              <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                <span>Total cost</span>
                <span>Rs {exactFinalCost}</span>
              </div>
              <Link to="/shipping" state={{ products: groupedItems, totalCost: exactFinalCost, quantities }}>
                <button className="w-full py-3 text-sm font-semibold text-white uppercase bg-indigo-500 hover:bg-indigo-600">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
