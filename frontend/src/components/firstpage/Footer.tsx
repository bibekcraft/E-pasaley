import React from "react";
import epsl from '../../assets/epsl.png';

export default function Footer() {
  return (
    <footer className="text-gray-600 bg-gradient-to-r from-white ">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About Section */}
          <div className="sm:col-span-2">
            <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <img src={epsl} alt="E-pasaley Logo" className="w-auto h-20" />
              <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">e-pasaley</span>
            </a>
            <div className="mt-6 text-gray-600 lg:max-w-sm">
              <p className="text-sm">
                e-pasaley is Nepal's trusted online store, offering a wide range of quality products at the best prices. We aim to simplify your shopping experience by bringing your favorite brands closer to you.
              </p>
              <p className="mt-4 text-sm">
                From electronics to fashion, we cater to all your needs with fast delivery and secure payment options. Experience hassle-free shopping with us!
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-green-600">Contacts</p>
            <div className="flex">
              <p className="mr-1 text-gray-600">Phone:</p>
              <a href="tel:+977-9705970545" aria-label="Our phone" title="Our phone" className="text-green-600 transition-colors duration-300 hover:text-green-800">
                9705970545
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-600">Email:</p>
              <a href="mailto:support@epasaley.com" aria-label="Our email" title="Our email" className="text-green-600 transition-colors duration-300 hover:text-green-800">
                shopwithepasale@gmail.com
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-600">Address:</p>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="text-green-600 transition-colors duration-300 hover:text-green-800">
                Butwal, Nepal
              </a>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <span className="text-base font-bold tracking-wide text-green-500">Social</span>
            <div className="flex items-center mt-1 space-x-3">
              <a href="https://www.instagram.com/shopwithepasaley/" className="text-gray-400 transition-colors duration-300 hover:text-white">
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                  <circle cx="15" cy="15" r="4"></circle>
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1S23,8.552,22.552,9z"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/shopwithepasaley" className="text-gray-400 transition-colors duration-300 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6">
                  <path d="M22,12 C22,6.48 17.52,2 12,2 C6.48,2 2,6.48 2,12 C2,16.84 5.66,20.88 10.28,21.82 V14.9 H7.89 V12 H10.28 V9.79 C10.28,7.52 11.56,6.37 13.61,6.37 C14.51,6.37 15.46,6.53 15.46,6.53 V8.85 H14.23 C13.01,8.85 12.72,9.59 12.72,10.37 V12 H15.37 L14.95,14.9 H12.72 V21.82 C17.34,20.88 22,16.84 22,12 Z"></path>
                </svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-white">
              Stay connected with us on social media to learn about our latest deals, offers, and updates.
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t border-gray-700 lg:flex-row">
          <p className="text-sm text-gray-400">
            © Copyright 2024 e-pasaley. All rights reserved.
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a href="/faq" className="text-sm transition-colors duration-300 hover:text-white">
                F.A.Q
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-sm transition-colors duration-300 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="text-sm transition-colors duration-300 hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
