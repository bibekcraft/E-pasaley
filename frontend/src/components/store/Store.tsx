import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import categoryReducer from '../slice/CategorySlice';
import productReducer from '../slice/ProductSlice';
import couponReducer from '../slice/CouponSlice';
import orderReducer from '../slice/orderSlice';
import faqReducer from '../slice/FaqSlice';
import registerReducer from '../slice/registerSlice';
import loginReducer from '../slice/loginSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    product: productReducer,
    coupons: couponReducer,
    order: orderReducer,
    faqs: faqReducer,
    register: registerReducer,
    login: loginReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
