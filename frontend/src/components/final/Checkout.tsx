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
    <div>
      <Header />
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
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      aria-label="Select quantity"
                      className="px-1 py-2 mr-6 border border-gray-200"
                    >
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

            {/* Proceed to Checkout Button */}
            <Link 
  to="/shipping" 
  state={{ 
    products: groupedItems.map(item => ({
      itemnumber: item.itemnumber, // Assuming item.id is the unique identifier
      final_price: item.final_price || 0,
      quantity: quantities[cartItems.findIndex(cartItem => cartItem.id === item.id)] || 1, // Use the quantity from state
      total: item.totalPrice.toFixed(2), // Total price per item
    })),
    totalCost: exactFinalCost 
  }}
>
  <button className="w-full py-3 text-sm font-semibold text-white uppercase bg-indigo-500 hover:bg-indigo-600">
    Proceed to Checkout
  </button>
</Link>

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

            {/* Show discount if applied */}
            {discount > 0 && (
              <div className="flex justify-between mt-5 text-sm font-semibold uppercase">
                <span>Discount Applied</span>
                <span className="text-green-500">- Rs {discount}</span>
              </div>
            )}

            <div className="mt-8 border-t">
              <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                <span>Total cost</span>
                <span>Rs {exactFinalCost}</span> {/* Final total with shipping */}
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
