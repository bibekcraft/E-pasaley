// src/App.tsx
import './App.css';
import FirstPage from './components/routing/FirstPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductView from './components/secondpage/ProductView';
import Checkout from './components/final/Checkout';
import Allproduct from './components/secondpage/Allproduct';
import HoverCard from './components/secondpage/Hovercard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import React from 'react';
import store from './components/store/Store';
import ProductDetail from './components/secondpage/ProductView';
import Shipping from './components/final/Shipping';
import Faq from './components/resources/Faq';
import ProductCarousel from './components/firstpage/ProductCarousel';
import Second from './components/routing/SndPage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import TermsAndConditions from './components/firstpage/TermsAndCondition';
import PrivacyPolicy from './components/firstpage/ProvacyPolicy';
import Testimonials from './components/firstpage/Testimonials';
import LoadingScreen from '../src/components/modal/LoadingScreen';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/home" element={<Second />} />
          {/* Protected Routes */}
          <Route path="/checkout" element={<ProtectedRoute Component={Checkout} />} />
          <Route path="/shipping" element={<ProtectedRoute Component={Shipping} />} />
          {/* Public Routes */}
          <Route path="/allproducts" element={<Allproduct />} />
          <Route path="/allproducts/:categoryId" element={<Allproduct />} />
          <Route path="/productview/:categoryId/:productId" element={<ProductView />} />
          <Route path="/productview" element={<ProductView />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/productcarousel" element={<ProductCarousel />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hovercard" element={<HoverCard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
