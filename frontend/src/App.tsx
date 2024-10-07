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
import AllProducts from './components/secondpage/Allproduct';
import ProductDetail from './components/secondpage/ProductView';
import Shipping from './components/final/Shipping';
import Faq from './components/resources/Faq';
import ProductCarousel from './components/firstpage/ProductCarousel';
import Second from './components/routing/SndPage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { logout  } from '../src/components/slice/authSlice';
import { useDispatch , useSelector} from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Select the authentication state

  useEffect(() => {
    // If the user is not logged in, log them out
    if (!isLoggedIn) {
      dispatch(logout());
    }
  }, [dispatch, isLoggedIn]);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/Home" element={<Second />} />

          {/* Protected Routes */}
          <Route path="/checkout" element={  <Checkout />} />
          <Route path="/shipping" element={<ProtectedRoute Component={Shipping} />} />

          {/* Public Routes */}
          <Route path="/allproducts" element={<Allproduct />} />
          <Route path="/allproducts/:categoryId" element={<Allproduct />} />
          <Route path="/productview/:categoryId/:productId" element={<ProductView />} />
          <Route path="/productview" element={<ProductView />} />
          <Route path="/allproducts/:categoryId?" element={<AllProducts />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/productcarousel" element={<ProductCarousel />} />

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
