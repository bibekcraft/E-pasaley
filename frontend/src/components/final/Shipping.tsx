import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    final_price: string | number;
}

interface ShippingProps {
    products: Product[];
    totalCost: number;
    quantities: number[];
}

function Shipping() {
    const dispatch = useDispatch();
    const location = useLocation<ShippingProps>();
    const { products, totalCost, quantities } = location.state || { products: [], totalCost: 0, quantities: [] };

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
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Dispatch form data to Redux store
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

        const totalAmount = totalCost;

        dispatch(setTotal(totalAmount));

        try {
            // Make an API request with form data, products, quantities, and total cost
            const response = await axios.post('/api/save-shipping-details/', {
                personal_details: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                },
                shipping_address: {
                    address_line: formData.addressLine,
                    city: formData.city,
                    state: formData.state,
                    zip_code: formData.zipCode,
                },
                total: totalAmount,
                products: products.map((product, index) => ({
                    id: product.id,
                    name: product.name,
                    final_price: product.final_price,
                    quantity: quantities[index], // Include quantity for each product
                })),
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
                {/* Order Summary */}
                <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
                    <h3 className="mb-6 text-2xl font-bold text-white">Order Summary</h3>
                    <ul>
                        {products.map((product, index) => (
                            <li key={product.id}>
                                {product.itemnumber}: Rs {product.final_price} x {quantities[index]} = Rs {(Number(product.final_price) || 0) * quantities[index]}
                            </li>
                        ))}
                    </ul>

                    {/* Total Cost Section */}
                    <div className="pt-4 mt-8 border-t">
                        <div className="flex justify-between py-6 font-semibold text-white uppercase text-10">
                            <span>Total cost</span>
                            <span>Rs {totalCost}</span>
                        </div>
                        <Link to="/shipping" state={{ products, totalCost, quantities }}>
                            <button className="w-full py-3 text-sm font-semibold text-white uppercase bg-indigo-500 hover:bg-indigo-600">
                                Checkout
                            </button>
                        </Link>
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
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mt-6">
                            <h3 className="mb-4 text-base text-gray-800">Shipping Address</h3>
                            <input
                                type="text"
                                name="addressLine"
                                placeholder="Address Line"
                                value={formData.addressLine}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                                required
                            />
                            <div className="grid gap-4 mt-4 md:grid-cols-2">
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
                            </div>
                            <div className="mt-4">
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

                        <button
                            type="submit"
                            className="w-full py-3 mt-6 text-sm font-semibold text-white uppercase bg-indigo-500 hover:bg-indigo-600"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Complete Order'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
