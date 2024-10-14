import React, { useState } from 'react';

const TrackOrder = () => {
  // State for the order item ID and tracking status
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sample order data (replace this with your actual order data)
  const orders = {
    '123': { status: 'Shipped', daysRemaining: 3 },
    '456': { status: 'Out for Delivery', daysRemaining: 1 },
    '789': { status: 'Delivered', daysRemaining: 0 },
  };

  // Function to check the order status
  const checkOrderStatus = () => {
    if (orderId.trim() === '') {
      setErrorMessage('Please enter an order ID.');
      setOrderStatus('');
      return;
    }

    if (orders[orderId]) {
      const { status, daysRemaining } = orders[orderId];
      setOrderStatus(`Status: ${status} (${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining)`);
      setErrorMessage('');
    } else {
      setErrorMessage('Order ID not found. Please check and try again.');
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
            placeholder="Enter your order ID"
            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            className="w-full py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
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
