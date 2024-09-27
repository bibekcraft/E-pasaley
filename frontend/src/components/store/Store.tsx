// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import categoryReducer from '../slice/CategorySlice';
import productReducer from '../slice/ProductSlice';
import couponReducer from '../slice/CouponSlice';
import orderReducer from '../slice/orderSlice';
import faqReducer from '../slice/FaqSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    product:productReducer,
    coupons: couponReducer ,
    orders: orderReducer,
    faqs: faqReducer,
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


