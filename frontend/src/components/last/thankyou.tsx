import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails; // Get order details from location state

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to the homepage or products page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gradient-to-br from-green-100 to-green-300">
      <h1 className="text-5xl font-bold text-green-800">Thank You!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your order has been placed successfully.
      </p>

      {/* Display order information */}
      {orderDetails && (
        <div className="p-4 mt-6 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Name:</strong> {orderDetails.first_name} {orderDetails.last_name}</p>
          <p><strong>Phone Number:</strong> {orderDetails.phone}</p>
          <p><strong>Item Number:</strong> {orderDetails.order_items[0]?.item_number}</p>
          <p><strong>Quantity:</strong> {orderDetails.order_items[0]?.quantity}</p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleContinueShopping}
          className="px-6 py-3 font-semibold text-white transition duration-200 bg-green-600 rounded-md hover:bg-green-500"
        >
          Continue Shopping
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <img
          src="/path/to/your/thank-you-image.png" // Adjust path accordingly
          alt=""
          className="w-1/2 max-w-md"
        />
      </div>
    </div>
  );
};

export default ThankYou;
