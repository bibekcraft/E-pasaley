import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice';
import { RootState } from '../store/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../modal/LoadingScreen';
import Faq from '../resources/Faq';
import Footer from '../firstpage/Footer';
import Header from '../firstpage/Header';

// InputField Component
function InputField({ name, type = "text", placeholder, value, onChange, required }: any) {
  return (
    <input
      className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
      item_number: item.itemnumber, 
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
        zip_code: formData.zipCode,
        total_cost: totalCost,
        order_items: productsData, 
      });

      if (response.status === 201) {
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
    <>
    <Header />
    <div className="min-h-screen font-sans bg-gray-100">
      <div className="container px-4 py-12 mx-auto lg:px-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Order Summary */}
          <div className="p-6 text-white rounded-lg shadow-lg lg:w-1/3 bg-gradient-to-r from-green-700 to-green-800">
            <h2 className="mb-4 text-xl font-bold">Your Order Summary</h2>
            {products.map((product) => (
              <div key={product.itemnumber} className="flex justify-between pb-2 mb-2 text-lg border-b border-green-500">
                <span>{product.itemnumber}</span>
                <span>{product.quantity}</span>
                <span>Rs {(Number(product.final_price) * product.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-4 mt-6 border-t border-green-600">
              <div className="flex justify-between text-lg font-bold uppercase">
                <span>Total cost</span>
                <span>Rs {totalCost}</span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="p-6 bg-white rounded-lg shadow-lg lg:w-2/3">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Shipping Information</h2>
            {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Personal Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Shipping Address</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Submit Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Faq />
      <Footer />
    </div>
    </>
  );
}

export default Shipping;
