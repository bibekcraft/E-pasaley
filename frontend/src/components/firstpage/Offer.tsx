import React from 'react';

const Offer = () => {
  const offers = [
    {
      type: "Mid-Size SUV",
      rating: 4.2,
      reviews: 11,
      image: "mid-size-suv.png", // Placeholder image
      transmission: "Automatic",
      fuel: "Gas",
      seats: "5 Seats",
      price: "₹1,700",
      originalPrice: null,
    },
    {
      type: "Premium SUV",
      rating: 4.7,
      reviews: 21,
      image: "premium-suv.png", // Placeholder image
      transmission: "Automatic",
      fuel: "Gas",
      seats: "4 Seats",
      price: "₹1,500",
      originalPrice: null,
    },
    {
      type: "Standard SUV",
      rating: null,
      reviews: null,
      image: "standard-suv.png", // Placeholder image
      transmission: "Manual",
      fuel: "Gas",
      seats:"2",
      price: "₹1,300",
      originalPrice: "₹1,600",
    },
    {
      type: "Standard SUV",
      rating: null,
      reviews: null,
      image: "standard-suv.png", // Placeholder image
      transmission: "Manual",
      fuel: "Gas",
      seats: null,
      price: "₹1,300",
      originalPrice: "₹1,600",
    },
  ];

  return (
    <div className="container py-10 mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {offers.map((offer, index) => (
          <div key={index} className="flex flex-col items-center justify-between h-full p-4 border rounded-lg shadow-lg">
            <div className="text-lg font-semibold">{offer.type}</div>

            <img
              src={offer.image}
              alt={offer.type}
              className="object-cover w-full h-40 my-4"
            />
            <div className="flex justify-between w-full text-sm text-gray-500">
              <span>{offer.transmission}</span>
              <span>|</span>
              <span>{offer.fuel}</span>
              {offer.seats && (
                <>
                  <span>|</span>
                  <span>{offer.seats}</span>
                </>
              )}
            </div>
            <div className="mt-4 text-lg font-bold">
              {offer.originalPrice && (
                <span className="mr-2 text-gray-500 line-through">
                  {offer.originalPrice}
                </span>
              )}
              <span>{offer.price} day</span>
            </div>
            <button className="w-full px-4 py-2 mt-4 text-white bg-black rounded hover:bg-gray-800">
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
