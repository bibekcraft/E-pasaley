import React, { useState, useEffect } from 'react';
import '../../App.css'; // Import the CSS file for styles
import epsl from '../../assets/epsl.png'; // Import the logo image
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
        <header className="header font-poppins">
            <div className="header-content">
                <h1 className="logo">
                <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
              <span className="ml-2 text-xl font-bold tracking-wide text-green-600 uppercase">e-pasaley</span>
            </a>
                </h1>
                <div className="delivery-info">

                </div>
            </div>

            {/* Sliding Text Section */}
            <div className="marquee">
                <div className="text-green-600 marquee-content">
                    Contact us at: E-pasaley | Follow us on Instagram: @Epasaley | 
                    {promoCodes.length > 0 
                        ? <span className="text-red-600"> Promo Codes: {promoCodes.join(', ')}</span>
                        : ' No promo codes available.'}
                </div>
            </div>
        </header>
    );
};

export default Header;
