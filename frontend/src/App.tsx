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
// Import Redux Provider and the correctly configured store
function App() {
  return (
            <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/productview" element={<ProductView />} /> 
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allproduct" element={<Allproduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hovercard" element={<HoverCard />} />
        </Routes>
      </Router>
  );
}

export default App;
