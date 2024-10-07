// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import store from '../src/components/store/Store'; // Import your store
import App from './App';
import './index.css';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App in Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
