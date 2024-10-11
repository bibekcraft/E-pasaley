// src/components/Testimonials.js
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  if (status === 'idle' || status === 'loading') {
    return     <LoadingScreen />;

  }

  return (
    <div className="px-4 mt-40 mb-20">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="mb-6 text-3xl font-bold">Testimonials</h3>
        <p className="pb-2 mb-6 text-gray-500 md:mb-12">
          Here's the feedback from our customers who have used our services.
        </p>
      </div>

      {status === 'loading' && <p>Loading testimonials...</p>}
      {status === 'failed' && <p>{error}</p>}

      <Slider {...settings}>
        {testimonials.length > 0 ? testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex flex-col items-center">
            <img
              src={testimonial.image}
              className="w-24 rounded-full shadow-lg"
              alt={testimonial.name}
            />
            <p className="my-4 text-xl text-neutral-500 dark:text-green-700">
              "{testimonial.description}"
            </p>
            <p className="italic">- {testimonial.name}</p>
          </div>
        )) : <p>No testimonials available.</p>}
      </Slider>
    </div>
  );
}

export default Testimonials;
