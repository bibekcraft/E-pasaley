// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

const Store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export default Store;
