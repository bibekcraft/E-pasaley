import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCrausel } from '../slice/crauselSlice'; // Adjust path as necessary

function Crausels() {
  const dispatch = useDispatch();
  const { crausel, status, error } = useSelector((state: any) => state.crausel);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch the carousel data when the component mounts
  useEffect(() => {
    dispatch(fetchCrausel());
  }, [dispatch]);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    if (crausel.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % crausel.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [crausel.length]);

  // Handle loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative w-full">
      {/* Carousel wrapper with increased height */}
      <div className="relative overflow-hidden rounded-lg h-[400px] md:h-[500px] lg:h-[600px]"> {/* Adjusted height */}
        {crausel.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image} // Display the image based on the fetched data
              className="absolute object-cover w-full h-full"
              alt={item.title || "Carousel image"}
            />
          </div>
        ))}
      </div>

      {/* Removed the slider indicators */}
    </div>
  );
}

export default Crausels;
