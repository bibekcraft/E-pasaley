import React, { useState } from 'react';

const TrackOrder = () => {
  // State for the order ID (which is also the tracking ID), order status, and error messages
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to check the order status by fetching from the backend
  const checkOrderStatus = async () => {
    // Validate input
    if (orderId.trim() === '') {
      setErrorMessage('Please enter an order ID (tracking ID).');
      setOrderStatus('');
      return;
    }

    // Try to fetch order status from the backend
    try {
      const response = await fetch(`http://127.0.0.1:8000/trackorder/${orderId}/${orderId}/`);
      // Using orderId as trackingId
      if (response.ok) {
        const data = await response.json();
        const { status, days_remaining } = data; // Adjust based on your API response structure
        setOrderStatus(`Status: ${status} (${days_remaining} day${days_remaining !== 1 ? 's' : ''} remaining)`);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Order ID not found. Please check and try again.');
        setOrderStatus('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while checking the order status. Please try again.');
      setOrderStatus('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Track Your Order</h1>

        {/* Order ID Input Section */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter your order ID (tracking ID)"
            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            className="w-full py-2 font-bold text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={checkOrderStatus}
          >
            Check Status
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}

        {/* Display Order Status */}
        {orderStatus && (
          <div className="p-4 text-center bg-gray-100 border border-gray-200 rounded-md">
            <p className="font-semibold">{orderStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
