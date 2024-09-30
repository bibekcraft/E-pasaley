import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails, setShippingAddress, setTotal } from '../slice/orderSlice';
import fetchProduct from '../slice/ProductSlice';
import { RootState } from '../store/store';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Product {
    id: number;
    itemnumber: string;  
    final_price: string | number;
}

function Shipping() {
    const dispatch = useDispatch();
    const location = useLocation();
    const categoryId = location.state?.categoryId;

    const products = useSelector((state: RootState) => state.product.products);
    const productStatus = useSelector((state: RootState) => state.product.status);
    const [quantities, setQuantities] = useState<number[]>([]);
    const [totalCost, setTotalCost] = useState(0);
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

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProduct(categoryId));
        }
    }, [dispatch, categoryId]);

    const calculateTotal = (fetchedProducts: Product[]) => {
        const total = fetchedProducts.reduce((acc, product, index) => 
            acc + (Number(product.final_price) * quantities[index]), 0);
        setTotalCost(total);
    };

    useEffect(() => {
        if (productStatus === 'succeeded' && products.length > 0) {
            const initialQuantities = products.map(() => 1); // Default quantity as 1
            setQuantities(initialQuantities);
            calculateTotal(products);
        }
    }, [productStatus, products]);

    const handleQuantityChange = (index: number, value: number) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = value;
        setQuantities(updatedQuantities);
        calculateTotal(products); // Recalculate total whenever quantities change
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(setTotal(totalCost));

        const productsData = products.map((product, index) => ({
            itemnumber: product.itemnumber,
            final_price: product.final_price,
            quantity: quantities[index],
            total: (quantities[index] * Number(product.final_price)).toFixed(2),
        }));

        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                zipcode: formData.zipCode,
                addressLine: formData.addressLine,
                city: formData.city,
                state: formData.state,
                total: totalCost,
                products: productsData,
            });
            if (response.status === 201) {
                console.log("Order completed successfully", response.data);
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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="font-[sans-serif] bg-white">
            <div className="flex h-full gap-12 max-sm:flex-col max-lg:gap-4">
                {/* Order Summary */}
                <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px] p-4">
                    <h2 className="text-xl font-semibold text-white">Your Order:</h2>
                    {products.map((product, index) => (
                        <div key={product.id} className="flex justify-between mt-2 text-white border-b border-gray-600">
                            <span>{product.itemnumber}</span>
                            <input
                                type="number"
                                value={quantities[index]}
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                className="w-16 text-center text-black"
                                min={1} // Prevent negative quantities
                            />
                            <span>Rs {Number(product.final_price) * quantities[index]}</span>
                        </div>
                    ))}
                    <div className="pt-4 mt-8 border-t border-gray-600">
                        <div className="flex justify-between py-6 font-semibold text-white uppercase">
                            <span>Total cost</span>
                            <span>Rs {totalCost.toFixed(2)}</span>
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
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Address Details */}
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
                        </div>
                        
                        <button
                            type="submit"
                            className={`mt-8 w-full px-4 py-3 text-base font-semibold text-white bg-blue-600 rounded-md ${loading && 'opacity-50 cursor-not-allowed'}`}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Complete Order'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
