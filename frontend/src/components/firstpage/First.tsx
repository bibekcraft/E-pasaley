import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
function First() {




  return (

        <div className="bg-white shadow-md">
            <div className="container flex items-center justify-between py-4 mx-auto">
                <div className="flex items-center">
                    <button className="p-2 bg-blue-100 rounded-lg">
                        <span className="block w-4 h-1 mb-1 bg-blue-500"></span>
                        <span className="block w-4 h-1 mb-1 bg-blue-500"></span>
                        <span className="block w-4 h-1 bg-blue-500"></span>
                    </button>
                    <h2 className="ml-2 text-2xl font-bold text-blue-500">MegaMart</h2>
                </div>
                <div className="flex justify-center flex-1">
                    <input
                        type="text"
                        placeholder="Search essentials, groceries and more..."
                        className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button className="p-2 ml-2 text-white bg-blue-500 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11.742 10.142A5.37 5.37 0 0013 7.5 5.5 5.5 0 107 13a5.37 5.37 0 002.642-1.258l4.368 4.368a1 1 0 001.415-1.415l-4.368-4.368zM10 2a5 5 0 100 10 5 5 0 000-10z" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mr-12 space-x-5">
                    <a href="#" className="text-blue-500">Track your order</a>
                    <a href="#" className="text-blue-500">All Offers</a>
                    <a href="/register" className="text-blue-500">Sign Up/Sign In</a>
                    <div className="flex space-x-4">
                        <Link to="/checkout" className="text-blue-500">
    <button className="w-20 h-11">
        <HiOutlineShoppingCart className="w-full h-full" fill="white" />
    </button>
</Link>
</div>


                </div>
            </div>
        </div>
    );
}

export default First;