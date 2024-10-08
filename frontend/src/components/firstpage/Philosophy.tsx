import React from "react"

function Philosophy() {
  return (
    <div>
      <section className="w-screen py-10 text-gray-800 bg-white">
        <div className="container w-full max-w-screen-xl mx-auto">
          <div className="w-full">
            <h2 className="text-3xl font-extrabold text-center text-gray-600">Our Commitment</h2>
            <p className="max-w-xl py-2 mx-auto mb-4 text-center text-gray-9`00 sm:text-lg">
              We are dedicated to offering our customers more than just products—we offer value, innovation, and reliability in every purchase.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/4 bg-green-800" />
              <h3 className="font-sans text-4xl font-light leading-10 text-green-800">VALUE.</h3>
              <p className="my-5 text-gray-600">
                We believe in providing the best deals and unbeatable prices without compromising on quality. Every product we offer is carefully selected to ensure you receive the best value for your money.
              </p>
            </div>
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/4 bg-green-800" />
              <h3 className="font-sans text-4xl font-light leading-10 text-green-800">TRUST.</h3>
              <p className="my-5 text-gray-600">
                Building trust with our customers is essential. We focus on transparency, timely deliveries, and quality assurance to ensure that every transaction is reliable and trustworthy.
              </p>
            </div>
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/4 bg-green-800" />
              <h3 className="font-sans text-4xl font-light leading-10 text-green-800">EXCELLENCE.</h3>
              <p className="my-5 text-gray-600">
                We strive for excellence in every aspect of our business, from customer service to product quality. Our mission is to exceed expectations and continuously improve our offerings for a superior shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Philosophy;
