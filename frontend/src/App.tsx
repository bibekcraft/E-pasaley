import './App.css';
import FirstPage from './components/routing/FirstPage'; // Corrected the casing of the import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import ProductView from './components/secondpage/ProductView'; // Corrected casing
import Checkout from './components/final/Checkout';
import Allproduct from './components/secondpage/Allproduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} /> {/* Updated to use element */}
        <Route path="/productview" element={<ProductView />} /> {/* Updated to use element */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/allproduct" element={<Allproduct />} />
      </Routes>
    </Router>
  );
}

export default App;
