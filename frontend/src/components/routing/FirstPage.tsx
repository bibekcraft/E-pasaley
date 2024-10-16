import React from 'react';
import First from '../firstpage/First'
import Crausels from '../firstpage/Crausels'
import WWW from '../firstpage/WWW'
// import Testamonials from '../firstpage/Testamonials'
import Offer from '../firstpage/Offer'
import Footer from '../firstpage/Footer'
import Philosophy from '../firstpage/Philosophy'
import Whyus from '../firstpage/Whyus'
import CategorySection from '../firstpage/CategorySection'
import  ProductCarousel from '../firstpage/ProductCarousel'
import Header from '../firstpage/Header';
// import Testamonials from '../firstpage/Testimonials';
import WelcomeModal from '../modal/WelcomeModal'
import DesignModal from '../modal/DesignModal';
import SndPage from '../firstpage/Sndheader';
import SecondCrausels from '../firstpage/SecondCrausels';
function FirstPage() {
  return (
    <>
    
    <DesignModal />
    <WelcomeModal />

    <Header />
    <First />
    <SndPage />
    <Crausels />
    <CategorySection />
    <WWW />
    <ProductCarousel />

    < SecondCrausels/>
    {/* <Testamonials /> */}
    <Offer />
    <Philosophy />
    <Whyus />

    <Footer />
    </>

  )
}

export default FirstPage