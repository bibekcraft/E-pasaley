import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice';
import { RootState } from '../store/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../modal/LoadingScreen';

// InputField Component
function InputField({ name, type = "text", placeholder, value, onChange, required }: any) {
  return (
    <input
      className="w-full p-2 border rounded-md"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

function Shipping() {
  const dispatch = useDispatch();
  const quantities = useSelector((state: RootState) => state.order.quantities);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { totalCost, products } = location.state || { totalCost: 0, products: [] };

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    dispatch(setTotal(totalCost));

    // Prepare the products data for the API
    const productsData = products.map((item) => ({
      item_number: item.itemnumber, // Ensure this key matches your API
      final_price: item.final_price,
      quantity: item.quantity,
      total: (item.quantity * Number(item.final_price)).toFixed(2),
    }));

    try {
      const response = await axios.post('http://127.0.0.1:8000/orders/', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address_line: formData.addressLine,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode, // Ensure this matches your API key
        total_cost: totalCost,
        order_items: productsData, // Ensure the key matches your API for order items
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
        // Navigate to Thank You page
        navigate('/thankyou');
      }
    } catch (error) {
      console.error("Error completing order:", error);
      setErrorMessage(error.response?.data?.detail || "An error occurred while completing the order.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while processing
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="font-sans bg-white">
      <div className="flex h-full gap-12 max-sm:flex-col max-lg:gap-4">
        {/* Order Summary */}
        <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px] p-4">
          <h2 className="text-xl font-semibold text-white">Your Order:</h2>
          {products.map((product) => (
            <div key={product.itemnumber} className="flex justify-between mt-2 text-white border-b border-green-600">
              <span>{product.itemnumber}</span>
              <span>{product.quantity}</span>
              <span>Rs {(Number(product.final_price) * product.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-4 mt-8 border-t border-green-600">
            <div className="flex justify-between py-6 font-semibold text-white uppercase">
              <span>Total cost</span>
              <span>Rs {totalCost}</span>
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
                <InputField 
                  name="firstName" 
                  placeholder="First Name" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
                <InputField 
                  name="lastName" 
                  placeholder="Last Name" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
                <InputField 
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <InputField 
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-6">
              <h3 className="mb-4 text-base text-gray-800">Shipping Address</h3>
              <div className="grid gap-4">
                <InputField 
                  name="addressLine"
                  placeholder="Address Line"
                  value={formData.addressLine}
                  onChange={handleChange}
                  required
                />
                <InputField 
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <InputField 
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <InputField 
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
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
