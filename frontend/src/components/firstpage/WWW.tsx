// src/components/WWW.tsx
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

// Sample brand logos
const brands = [
  { name: "Amazon", logo: "https://cdn.logojoy.com/wp-content/uploads/20230629132639/current-logo-600x338.png" }, // Replace with actual logo paths
  { name: "Flipkart", logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" },
  { name: "Myntra", logo: "https://www.perficient.com/-/media/images/insights/research/case-study-logos/myntra_logo-min.ashx?h=1600&iar=0&w=5100&hash=6ABE517E5CDA2D1710DF42786417FE33" },
  { name: "H&M", logo: "https://www.graftoncentre.co.uk/wp-content/uploads/2016/09/h-and-m.png" },
  { name: "Boat", logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" },
  { name: "Firebolt", logo: "https://www.itvoice.in/wp-content/uploads/2023/05/Brand-Logo-1.png" },
  
  { name: "Red-Tape", logo: "https://assets.tatacliq.com/medias/sys_master/images/47020900188190.jpg" },
  { name: "adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
];

const WWW: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Change slide every 2 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-8 mt-40 mb-40">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-500">Also Shop From Here To Import Product</h2>
      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-center">
            <img src={brand.logo} alt={brand.name} className="object-contain h-16 mx-auto mt-20" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WWW;
