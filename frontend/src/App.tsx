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
import store from './components/store/Store'
import AllProducts from './components/secondpage/Allproduct';
import ProductDetail from './components/secondpage/ProductView';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allproducts" element={<Allproduct />} />
          <Route path="/allproducts/:categoryId" element={<Allproduct />} />
          <Route path="/productview/:productId" element={<ProductView />} />
          <Route path="/productview" element={<ProductView />} />
          <Route path="/allproducts/:categoryId?" Component={AllProducts} />
          <Route path="/product/:productId" Component={ProductDetail} /> 

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hovercard" element={<HoverCard />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;
