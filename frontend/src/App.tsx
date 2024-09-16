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
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allproducts/:categoryId" element={<Allproduct />} />
          <Route path="/productview/:productId" element={<ProductView />} />        
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hovercard" element={<HoverCard />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;
