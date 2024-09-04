import './App.css';
import FirstPage from './components/routing/FirstPage'; // Corrected the casing of the import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import ProductView from './components/secondpage/ProductView'; // Corrected casing

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} /> {/* Updated to use element */}
        <Route path="/productview" element={<ProductView />} /> {/* Updated to use element */}
      </Routes>
    </Router>
  );
}

export default App;
