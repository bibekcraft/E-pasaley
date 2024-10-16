import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTestimonials } from "../slice/testimonialsSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import LoadingScreen from "../modal/LoadingScreen";
import "slick-carousel/slick/slick-theme.css"; 

function Testimonials() {
  const dispatch = useDispatch();
  const { testimonials, status, error } = useSelector((state) => state.testimonials);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTestimonials());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log("Fetched Testimonials:", testimonials); // Log testimonials to check for duplicates
    }
  }, [status, testimonials]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,  // Add arrows for manual control
  };
  
  if (status === 'idle' || status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <div className="px-4 py-20 mt-20 mb-20 bg-gray-50 dark:white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="mb-6 text-4xl font-extrabold text-gray-900 dark:text-blue-600">
          Testimonials
        </h3>
        <p className="pb-2 mb-10 text-lg text-gray-600 dark:text-gray-400">
          See what our customers say about our services.
        </p>
      </div>

      {status === 'loading' && <p>Loading testimonials...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col items-center text-center">
                <img
                  src={testimonial.image}
                  className="w-24 h-24 mb-4 rounded-full shadow-lg ring-4 ring-green-500"
                  alt={testimonial.name}
                />
                <p className="max-w-xl mb-4 text-xl font-medium text-gray-800 dark:text-gray-300">
                  "{testimonial.description}"
                </p>
                <p className="text-lg italic text-gray-500 dark:text-gray-400">
                  - {testimonial.name}
                </p>
              </div>
            ))
          ) : (
            <p>No testimonials available.</p>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default Testimonials;
