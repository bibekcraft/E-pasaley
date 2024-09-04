import First from '../firstpage/First'
import Crausels from '../firstpage/Crausels'
import TopArraival from '../firstpage/TopArraival'
import WWW from '../firstpage/WWW'
// import Testamonials from '../firstpage/Testamonials'
import Offer from '../firstpage/Offer'
import Footer from '../firstpage/Footer'
import Philosophy from '../firstpage/Philosophy'
import Allproduct from '../secondpage/Allproduct'
import Whyus from '../firstpage/Whyus'
function FirstPage() {
  return (
    <><First />
    <Crausels />
    <TopArraival />
    <WWW />
    {/* <Testamonials /> */}
    <Offer />
    <Philosophy />
    <Allproduct />
    <Whyus />
    <Footer />
    </>

  )
}

export default FirstPage