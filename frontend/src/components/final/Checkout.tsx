import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store, { RootState } from '../store/Store';
import { removeItemFromCart } from '../slice/cartSlice';
import { validateCoupon, reset } from '../slice/CouponSlice';
import CategorySection from '../firstpage/CategorySection';
import { Link } from 'react-router-dom';
import Header from '../firstpage/Header';
import Footer from '../firstpage/Footer';

const Checkout: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { discount = 0, status = 'idle', error } = useSelector((state: RootState) => state.coupons);

  const [quantities, setQuantities] = useState(cartItems.map((item) => item.quantity || 1));
  const [couponCode, setCouponCode] = useState('');

  // Handle quantity change
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity;
    setQuantities(updatedQuantities);
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  // Group items and calculate total prices
  const groupedItems = cartItems.map((item, index) => {
    const finalPrice = item.final_price || 0;
    const quantity = quantities[index];
    return {
      ...item,
      totalPrice: finalPrice * quantity,
    };
  });

  const totalPrice = groupedItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  const totalWithDiscount = totalPrice - discount;
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CategorySection />
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-md sm:flex">
          <div className="w-full px-10 py-10 sm:w-3/4">
            <h1 className="mb-6 text-2xl font-semibold text-gray-800">Shopping Cart</h1>
            {groupedItems.length === 0 ? (
              <p className="text-lg text-gray-600">Your cart is empty.</p>
            ) : (
              groupedItems.map((item, index) => (
                <div key={item.id} className="flex items-start py-4 border-b border-gray-300">
                  <div className="w-24">
                    <img src={item.image} alt={item.name} className="object-cover object-center w-full h-full rounded-md" />
                  </div>
                  <div className="flex-1 pl-4">
                    <p className="text-lg font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                    <p className="text-sm text-red-600">Item number: {item.itemnumber}</p>
                    <div className="flex items-center justify-between mt-2">
                      <select
                        value={quantities[index]}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <p className="text-lg font-semibold text-gray-800">Rs {item.totalPrice.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="mt-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Proceed to Checkout Button */}
            <Link
              to="/shipping"
              state={{
                products: groupedItems.map(item => ({
                  itemnumber: item.id, // Using item.id as unique identifier
                  final_price: item.final_price || 0,
                  quantity: quantities[cartItems.findIndex(cartItem => cartItem.id === item.id)] || 1, // Use the quantity from state
                  total: item.totalPrice.toFixed(2), // Total price per item
                })),
                totalCost: exactFinalCost
              }}
            >
              <button className="w-full py-3 mt-5 text-sm font-semibold text-white uppercase transition duration-300 bg-indigo-500 rounded-md hover:bg-indigo-600">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          <div className="w-full px-8 py-10 rounded-lg shadow-md sm:w-1/4 md:w-1/2 bg-gray-50">
            <h1 className="pb-4 text-2xl font-semibold border-b">Order Summary</h1>
            <div className="flex justify-between mt-6 mb-4">
              <span className="text-sm font-semibold">Items {groupedItems.length}</span>
              <span className="text-sm font-semibold">Rs {totalPrice.toFixed(2)}</span>
            </div>
            <div>
              <label className="inline-block mb-2 text-sm font-medium">Shipping</label>
              <select className="block w-full p-2 text-sm text-gray-600 border border-gray-300 rounded-md">
                <option>Standard shipping - Rs {shippingCost}</option>
              </select>
            </div>
            <div className="py-6">
              <label className="inline-block mb-2 text-sm font-semibold">Promo Code</label>
              <input
                type="text"
                placeholder="Enter your code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              className="px-5 py-2 text-sm text-white uppercase transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
              disabled={status === 'loading'}
            >
              Apply
            </button>

            {status === 'loading' && <p className="mt-2 text-sm text-gray-500">Validating coupon...</p>}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            {/* Show discount if applied */}
            {discount > 0 && (
              <div className="flex justify-between mt-5 text-sm font-semibold uppercase">
                <span>Discount Applied</span>
                <span className="text-green-500">- Rs {discount}</span>
              </div>
            )}

            <div className="pt-4 mt-6 border-t">
              <div className="flex justify-between text-lg font-semibold uppercase">
                <span>Total cost</span>
                <span>Rs {exactFinalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
