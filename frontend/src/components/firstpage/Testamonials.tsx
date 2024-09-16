import React from "react"
function Testamonials() {
  return (
    <div><section className="px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h3 className="mb-6 text-3xl font-bold">Testimonials</h3>
      <p className="pb-2 mb-6 text-blue-700 md:mb-12">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
        error amet numquam iure provident voluptate esse quasi, veritatis
        totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
    </div>
  
    <div className="grid gap-12 text-center md:grid-cols-2">
      {/* <!--First Testimonial--> */}
      <div className="mb-6 md:mb-0">
        <div className="flex justify-center mb-6">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(22).jpg"
            className="w-24 rounded-full shadow-lg dark:shadow-black/30" />
        </div>
        <p className="my-4 text-xl text-neutral-500 dark:text-blue-300">
          "Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
          elit sed ut perspiciatis unde omnis."
        </p>
        <p className="italic">- Anna Morian</p>
      </div>
  
      {/* <!--Second Testimonial--> */}
      <div className="mb-0">
        <div className="flex justify-center mb-6">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
            className="w-24 rounded-full shadow-lg dark:shadow-black/30" />
        </div>
        <p className="my-4 text-xl text-neutral-500 dark:text-blue-300">
          "Neque cupiditate assumenda in maiores repudiandae mollitia
          architecto elit sed adipiscing elit."
        </p>
        <p className="italic">- Teresa May</p>
      </div>
    </div>
  </section></div>
  )
}

export default Testamonials