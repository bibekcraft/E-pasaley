import React from 'react';
import Second from '../firstpage/Second'
import Crausels from '../firstpage/Crausels'
import TopArraival from '../firstpage/TopArraival'
import WWW from '../firstpage/WWW'
// import Testamonials from '../firstpage/Testamonials'
import Offer from '../firstpage/Offer'
import Footer from '../firstpage/Footer'
import Philosophy from '../firstpage/Philosophy'
import Whyus from '../firstpage/Whyus'
import CategorySection from '../firstpage/CategorySection'
import  ProductCarousel from '../firstpage/ProductCarousel'
import Header from '../firstpage/Header';
function SndPage() {
  return (
    <>
    <Header />
    <Second />
    <Crausels />
    <CategorySection />
    <TopArraival />
    <WWW />
    <ProductCarousel />
    {/* <Testamonials /> */}
    <Offer />
    <Philosophy />
    <Whyus />
    <Footer />
    </>

  )
}

export default SndPage