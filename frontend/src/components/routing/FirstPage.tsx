import React from 'react';
import First from '../firstpage/First'
import Crausels from '../firstpage/Crausels'
import TopArraival from '../firstpage/TopArraival'
import WWW from '../firstpage/WWW'
// import Testamonials from '../firstpage/Testamonials'
import Offer from '../firstpage/Offer'
import Footer from '../firstpage/Footer'
import Philosophy from '../firstpage/Philosophy'
import Whyus from '../firstpage/Whyus'
import Categories from '../firstpage/Categories'
import CategorySection from '../firstpage/CategorySection'
function FirstPage() {
  return (
    <>
    <First />
    <Categories />
    <Crausels />
    <CategorySection />
    <TopArraival />
    <WWW />
    {/* <Testamonials /> */}
    <Offer />
    <Philosophy />
    <Whyus />
    <Footer />
    </>

  )
}

export default FirstPage