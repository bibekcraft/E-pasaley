import React, { useState, useEffect } from 'react';
import '../../App.css'; // Import the CSS file for additional custom styles if needed

const Header = () => {
    const [promoCodes, setPromoCodes] = useState([]); // Store promo codes from the API

    // Fetch promo codes from the API
    useEffect(() => {
        const fetchPromoCodes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/coupons/'); // Replace with your API endpoint
                const data = await response.json();
                setPromoCodes(data); // Assuming the API returns an array of promo codes
            } catch (error) {
                console.error('Error fetching promo codes:', error);
            }
        };

        fetchPromoCodes();
    }, []);

    return (
        <header className="w-full py-0 text-blue-900 bg-white font-poppins">


            {/* Sliding Text Section */}
            <div className="w-full py-2 overflow-hidden bg-green-700">
                <div className="marquee ">
                    <div 
                        className="text-white animate-marquee"  
                        style={{ fontSize: '0.75rem' }} // Reduced font size for sliding text
                    >
                        Contact us at: E-pasaley | Follow us on Instagram: @Epasaley | 
                        Add promocode to get a certain discount on our products ||
                        {promoCodes.length > 0 
                            ? <span className="text-white font-extralight">
                                      Promo Codes: {promoCodes.map(promo => promo.code).join(', ')}
                              </span>
                            : ' No promo codes available.'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
