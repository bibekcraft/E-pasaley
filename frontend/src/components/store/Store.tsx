import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import categoryReducer from '../slice/CategorySlice';
import productReducer from '../slice/ProductSlice';
import couponReducer from '../slice/CouponSlice';
import orderReducer from '../slice/orderSlice';
import faqReducer from '../slice/FaqSlice';
import authReducer from '../slice/loginSlice';
import registerReducer from '../slice/registerSlice';
import loginReducer from '../slice/loginSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    product: productReducer,
    coupons: couponReducer,
    order: orderReducer,
    faqs: faqReducer,
    auth: authReducer,
    register: registerReducer,
    login: loginReducer,
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
