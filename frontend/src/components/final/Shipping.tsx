import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPersonalDetails, setTotal, clearCart } from '../slice/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../modal/LoadingScreen';
import Faq from '../resources/Faq';
import Footer from '../firstpage/Footer';
import Header from '../firstpage/Header';

// InputField Component
function InputField({ name, type = "text", placeholder, value, onChange, required }) {
  return (
    <input
      className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

// Shipping Component
function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Access products and total cost from the state
  const { products, totalCost } = location.state || { products: [], totalCost: 0 };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Dispatch personal details and shipping address to Redux store
    dispatch(setPersonalDetails({
      firstName: formData.firstName,
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
        dispatch(clearCart());
        navigate('/thankyou');
      }
    } catch (error) {
      console.error("Error completing order:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.detail || "An error occurred while completing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading && <LoadingScreen />}
      <div className="container mx-auto mt-10">
        <div className="flex flex-col lg:flex-row">
          {/* Order Summary */}
          <div className="p-6 text-white rounded-lg shadow-lg lg:w-1/3 bg-gradient-to-r from-green-700 to-green-800">
            <h2 className="mb-4 text-xl font-bold">Your Order Summary</h2>
            {products.map((product) => (
              <div key={product.itemnumber} className="flex justify-between pb-2 mb-2 text-lg border-b border-green-500">
                <span>{product.name}</span>
                <span>{product.quantity}</span>
                <span>Rs {(Number(product.final_price) * product.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-4 mt-6 border-t border-green-600">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Cost:</span>
                <span>Rs {totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="flex-grow p-6 bg-white rounded-lg shadow-lg lg:w-2/3">
            <h2 className="mb-4 text-xl font-bold">Shipping Details</h2>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <InputField name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <InputField name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <InputField name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <InputField name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <InputField name="addressLine" placeholder="Address Line" value={formData.addressLine} onChange={handleChange} required />
                <InputField name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <InputField name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <InputField name="zipCode" type="number" placeholder="ZIP Code" value={formData.zipCode} onChange={handleChange} required />
              </div>
              <button type="submit" className="w-full py-2 text-white bg-green-700 rounded hover:bg-green-800">
                Submit Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <Faq />
      <Footer />
    </>
  );
}

export default Shipping;
