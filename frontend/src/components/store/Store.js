// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import categoryReducer from './categorySlice';
const Store = configureStore({
  reducer: {
    cart: cartReducer, 
    category: categoryReducer,
  },
});

export default Store;
