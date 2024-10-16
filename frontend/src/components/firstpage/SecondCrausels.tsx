import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecondCrausel } from '../slice/secondCrauselSlice '; // Adjust path as necessary

function SecondCrausels() {
  const dispatch = useDispatch();
  const { secondCrausel, status, error } = useSelector((state) => state.secondCrausel);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch the carousel data when the component mounts
  useEffect(() => {
    dispatch(fetchSecondCrausel());
  }, [dispatch]);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    if (secondCrausel.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % secondCrausel.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [secondCrausel.length]);

  // Handle loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center w-full p-2"> {/* Flexbox to center the carousel */}
      {/* Wider and taller carousel wrapper */}
      <div className="relative overflow-hidden rounded-lg shadow-md w-[900px] h-[250px] md:w-[1000px] md:h-[300px] lg:w-[1100px] lg:h-[350px]"> {/* Increased width and height */}
        {secondCrausel.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image} // Display the image based on the fetched data
              className="absolute object-cover w-full h-full rounded-lg"
              alt={item.title || "Carousel image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecondCrausels;
