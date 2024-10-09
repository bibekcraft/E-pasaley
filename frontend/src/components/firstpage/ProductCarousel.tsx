// import React, { useState, useEffect } from 'react';
// // import 'react-awesome-slider/dist/styles.css';
// import axios from 'axios';
// import { FaHandHoldingUsd } from 'react-icons/fa';

// const ProductCarousel = () => {
//   interface Feature {
//     icon: JSX.Element;
//     text: string;
//   }

//   const [features, setFeatures] = useState<Feature[]>([]);

//   useEffect(() => {
//     // Replace with your actual API endpoint
//     const fetchFeatures = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/features');
//         setFeatures(response.data);
//       } catch (error) {
//         console.error('Error fetching features:', error);
//       }
//     };

//     fetchFeatures();
//   }, []);

//   // Default features in case API is not used
//   // Uncomment below and comment out API fetch if needed
//   /*
//   const features = [
//     {
//       icon: <FaHandHoldingUsd size={70} />,
//       text: '100% Money Back Guarantee',
//     },
//     {
//       icon: <FaDollarSign size={70} />,
//       text: 'Lowest Overall Order Cost',
//     },
//     {
//       icon: <FaStar size={70} />,
//       text: 'Premium & Luxury Brands',
//     },
//     {
//       icon: <FaShippingFast size={70} />,
//       text: 'Worldwide Shipping',
//     },
//     {
//       icon: <FaBoxOpen size={70} />,
//       text: '300M+ International Products',
//     },
//   ];
//   */

//   return (
//     <div className="py-12 bg-green-600">
//       <h2 className="mb-6 text-2xl font-bold text-center text-white">Top Arrivals</h2>
//       <div className="carousel">
//         {features.map((feature, index) => (
//           <div key={index} className="px-4">
//             <div className="p-6 text-center bg-white rounded-lg shadow-lg">
//               <div className="mb-4 text-green-600">
//                 {feature.icon || <FaHandHoldingUsd size={70} />}
//               </div>
//               <p className="text-lg font-semibold text-green-600">{feature.text || 'Default Feature'}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCarousel;
import React from 'react'

function ProductCarousel() {
  return (
    <div>
      
    </div>
  )
}

export default ProductCarousel
