import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import categoryReducer from '../slice/CategorySlice';
import productReducer from '../slice/ProductSlice';
import couponReducer from '../slice/CouponSlice';
import orderReducer from '../slice/orderSlice';
import faqReducer from '../slice/FaqSlice';
import registerReducer from '../slice/registerSlice';
import loginReducer from '../slice/loginSlice';
import authReducer from '../slice/authSlice';
import testimonialsReducer from '../slice/testimonialsSlice';
import CrauselReducer from '../slice/crauselSlice';
import secondCrauselReducer  from '../slice/secondCrauselSlice ';
const store = configureStore({
  reducer: {
    secondCrausel: secondCrauselReducer,
    cart: cartReducer,
    categories: categoryReducer,
    product: productReducer, 
    order: orderReducer,
    faqs: faqReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
    testimonials: testimonialsReducer,
    coupons: couponReducer,
    crausel: CrauselReducer,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;