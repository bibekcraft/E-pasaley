import React, { useState, useEffect } from 'react';
import '../../App.css'; // Import the CSS file for styles

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
        <header className="header">
            <div className="header-content">
                <h1 className="logo">Worldwide Megamart</h1>
                <div className="delivery-info">
                    <span>Deliver to:</span>
                    <strong>423651</strong>
                </div>
            </div>

            {/* Sliding Text Section */}
            <div className="marquee">
                <div className="marquee-content">
                    Contact us at: E-pasaley | Follow us on Instagram: @Epasaley | 
                    {promoCodes.length > 0 
                        ? ` Promo Codes: ${promoCodes.join(', ')}`
                        : ' No promo codes available.'}
                </div>
            </div>
        </header>
    );
};

export default Header;
