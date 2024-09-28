import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Shipping() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { products } = location.state as { products: CartItem[] };

    // Calculate total amount based on product prices and quantities
    const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);

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
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

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

        dispatch(setTotal(totalAmount));

        try {
            const response = await axios.post('/api/save-shipping-details/', {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address_line: formData.addressLine,
                city: formData.city,
                state: formData.state,
                zip_code: formData.zipCode,
                total: totalAmount,
                products // Send products data if necessary
            });

            if (response.status === 201) {
                console.log("Purchase completed successfully", response.data);
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
            setErrorMessage("Error completing purchase: " + error.response?.data?.detail || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-[sans-serif] bg-white">
            <div className="flex h-full gap-12 max-sm:flex-col max-lg:gap-4">
                <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
                    {/* Order Summary */}
                    <h3 className="text-white">Order Summary</h3>
                    {products.map(product => {
    const price = typeof product.price === 'number' ? product.price : 0; // Default to 0 if price is not a number
    const quantity = typeof product.quantity === 'number' ? product.quantity : 0; // Default to 0 if quantity is not a number
    const total = price * quantity;

    return (
        <div key={product.id} className="text-white">
            <p>
                {product.itemnumber} - Rs {price} x {quantity} = Rs {total}
            </p>
        </div>
    );
})}

                    {/* Total Cost Section */}
                    <div className="mt-8 border-t">
                        <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                            <span>Total cost</span>
                            <span>Rs {totalAmount}</span> {/* Final total with shipping */}
                        </div>
                        <Link to="/shipping" state={{ products }}>
                            <button className="w-full py-3 text-sm font-semibold text-white uppercase bg-indigo-500 hover:bg-indigo-600">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="sticky top-0 w-full max-w-4xl px-4 py-8 rounded-md h-max">
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
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
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
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
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
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone No."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
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
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
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
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
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
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 mt-8 max-md:flex-col">
                                <button
                                    type="button"
                                    className="w-full px-6 py-3 text-sm tracking-wide text-gray-800 bg-transparent border border-gray-300 rounded-md hover:bg-gray-100 max-md:order-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`w-full px-6 py-3 text-sm tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 ${loading ? 'opacity-50' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Submit Order'}
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
