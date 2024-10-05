// src/App.tsx
import './App.css';
import FirstPage from './components/routing/FirstPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductView from './components/secondpage/ProductView';
import Checkout from './components/final/Checkout';
import Allproduct from './components/secondpage/Allproduct';
import HoverCard from './components/secondpage/Hovercard';
import Login from './components/auth/Login';
import Signup from './components/auth/signup';
import { Provider } from 'react-redux';
import React from 'react';
import store from './components/store/Store'
import AllProducts from './components/secondpage/Allproduct';
import ProductDetail from './components/secondpage/ProductView';
import Shipping from './components/final/Shipping';
import Faq from './components/resources/Faq';
import ProductCarousel from './components/firstpage/ProductCarousel';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} /> 
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allproducts" element={<Allproduct />} />
          <Route path="/allproducts/:categoryId" element={<Allproduct />} />
          <Route path="/productview/:categoryId/:productId" element={<ProductView />} />
                    <Route path="/productview" element={<ProductView />} />
          <Route path="/allproducts/:categoryId?" element={<AllProducts />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/faq" element={<Faq />} />

          <Route path="/product/:productId" element={<ProductDetail/>} /> 
          <Route path="/product" element={<ProductDetail/>} />
          <Route path="/productcarousel" element={<ProductCarousel />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/hovercard" element={<HoverCard />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;
