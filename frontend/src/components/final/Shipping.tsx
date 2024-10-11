import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice';
import { RootState } from '../store/Store';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../modal/LoadingScreen';
function Shipping() {
  const dispatch = useDispatch();

  // Fetch cart items and quantities from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantities = useSelector((state: RootState) => state.order.quantities); // Get quantities from Redux

  const location = useLocation();
  const { totalCost } = location.state || { totalCost: 0 }; // Get total cost passed from Checkout

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Dispatch personal details and shipping address to Redux store
    dispatch(setPersonalDetails({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    }));
    dispatch(setShippingAddress({
      addressLine: formData.addressLine,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    }));
    dispatch(setTotal(totalCost)); // Use the total cost passed from Checkout

    const productsData = cartItems.map((item, index) => ({
      itemnumber: item.itemnumber,
      final_price: item.final_price,
      quantity: quantities[index] || 1, // Default to 1 if undefined
      total: (quantities[index] * Number(item.final_price)).toFixed(2),
    }));

    try {
      const response = await axios.post('http://127.0.0.1:8000/orders/', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        zipcode: formData.zipCode,
        address_line: formData.addressLine,
        city: formData.city,
        state: formData.state,
        total_cost: totalCost, // Use the total cost passed from Checkout
        products: productsData,
      });
      if (response.status === 201) {
        console.log("Order completed successfully", response.data);
        // Reset form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          addressLine: '',
          city: '',
          state: '',
          zipCode: '',
        });
      }
    } catch (error) {
      console.error("Error completing order:", error);
      setErrorMessage("Error completing order: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }

    
    if (status === 'idle' || status === 'loading') {
      return     <LoadingScreen />;

    }
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex h-full gap-12 max-sm:flex-col max-lg:gap-4">
        {/* Order Summary */}
        <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px] p-4">
          <h2 className="text-xl font-semibold text-white">Your Order:</h2>
          {cartItems.map((product, index) => (
            <div key={product.id} className="flex justify-between mt-2 text-white border-b border-green-600">
              <span>{product.itemnumber}</span>
              <span>{quantities[index] || 1}</span> {/* Show quantity */}
              <span>Rs {(Number(product.final_price) * (quantities[index] || 1)).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-4 mt-8 border-t border-green-600">
          <div className="pt-4 mt-8 border-t border-green-600">
            <div className="flex justify-between py-6 font-semibold text-white uppercase">
              <span>Total cost</span>
              <span>Rs {totalCost}</span> {/* Display the total cost after discount */}
            </div>
          </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="sticky top-0 w-full max-w-4xl px-4 py-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div>
              <h3 className="mb-4 text-base text-gray-800">Personal Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-6">
              <h3 className="mb-4 text-base text-gray-800">Shipping Address</h3>
              <div className="grid gap-4">
                <div>
                  <input
                    type="text"
                    name="addressLine"
                    placeholder="Address Line"
                    value={formData.addressLine}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-6 py-3 font-semibold text-white bg-blue-600 rounded-md transition duration-200 hover:bg-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
