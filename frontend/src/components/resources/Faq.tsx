import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faqs } from '../slice/FaqSlice'; // Import the async thunk

function Faq() {
  const dispatch = useDispatch();

  // Access the FAQs and state from the Redux store
  const { faqs: faqData, status, error } = useSelector((state) => state.faqs);

  // State to track which FAQ item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Fetch the FAQs when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(faqs());
    }
  }, [status, dispatch]);

  // Function to toggle an FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h6 className="mb-2 text-lg font-medium text-indigo-600">FAQs</h6>
          <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] font-manrope">
            Frequently Asked Questions
          </h2>
        </div>

        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

        {status === 'succeeded' && (
          <div className="space-y-4 accordion-group">
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className={`overflow-hidden transition-all duration-500 border-b border-gray-200 rounded-xl shadow-sm ${
                  openIndex === index ? 'bg-white py-4' : 'py-2 bg-gray-100' // Change background for closed state
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left text-gray-600 transition duration-500 group focus:outline-none hover:text-indigo-600"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq${index}`}
                >
                  <h5 className="ml-5 text-lg font-semibold">{faq.title}</h5>
                  <svg
                    className={`text-gray-500 transition-transform duration-500 transform group-hover:text-indigo-600 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    width="22"
                    height="12"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                {/* Description is only visible when the corresponding item is open */}
                <div
                  id={`faq${index}`}
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-base text-gray-600">{faq.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Faq;
