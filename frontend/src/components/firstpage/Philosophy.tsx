import React from "react"
function Philosophy() {
  return (
    <div><section className="w-screen py-10 text-gray-800 bg-white">
    <div className="container w-full max-w-screen-xl mx-auto">
      <div className="w-full"> 
        <h2 className="text-3xl font-extrabold text-center">Our Values</h2>
        <p className="max-w-xl py-2 mx-auto mb-4 text-center text-gray-600 sm:text-lg"></p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-4 text-left lg:w-1/3">
          <hr className="mb-4 h-1.5 w-1/4 bg-blue-600" />
          <h3 className="font-sans text-4xl font-light leading-10">INNOVATE.</h3>
          <p className="my-5 text-gray-600">We embrace creativity and strive to bring unique and fashionable products to our customers. By continuously exploring new trends and technologies, we aim to enhance our offerings and provide an exceptional shopping experience.</p>
        </div>
        <div className="w-full p-4 text-left lg:w-1/3">
          <hr className="mb-4 h-1.5 w-1/4 bg-blue-600" />
          <h3 className="font-sans text-4xl font-light leading-10">GROW.</h3>
          <p className="my-5 text-gray-600"> We believe in sustainable growth, both for our business and our partners. We are committed to expanding our product range and market presence while fostering relationships with suppliers and customers that promote mutual success.</p>
        </div>
        <div className="w-full p-4 text-left lg:w-1/3">
          <hr className="mb-4 h-1.5 w-1/4 bg-blue-600" />
          <h3 className="font-sans text-4xl font-light leading-10">SERVE.</h3>
          <p className="my-5 text-gray-600">Customer satisfaction is at the heart of our operations. We prioritize understanding our customers' needs and delivering high-quality products and services. Our goal is to build lasting relationships through reliable support and exceptional service.</p>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Philosophy