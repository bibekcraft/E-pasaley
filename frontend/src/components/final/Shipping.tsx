import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice'; // Adjust the path accordingly

function Shipping() {
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch personal details and shipping address to the store
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
    // Optionally set total (if applicable)
    dispatch(setTotal(84.00)); // Replace with your actual total value
    // Reset form or navigate to another page if needed
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex h-full gap-12 max-sm:flex-col max-lg:gap-4">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          {/* Order summary goes here */}
          {/* ... */}
        </div>

        <div className="sticky top-0 w-full max-w-4xl px-4 py-8 rounded-md h-max">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8" onSubmit={handleSubmit}>
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
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone No."
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-base text-gray-800">Shipping Address</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="addressLine"
                    placeholder="Address Line"
                    value={formData.addressLine}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8 max-md:flex-col">
                <button
                  type="button"
                  className="w-full px-6 py-3 text-sm tracking-wide text-gray-800 bg-transparent border border-gray-300 rounded-md hover:bg-gray-100 max-md:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
