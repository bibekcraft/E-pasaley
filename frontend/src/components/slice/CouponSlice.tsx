import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const validateCoupon = createAsyncThunk(
  'coupons/validateCoupon',
  async (code: string) => {
    const response = await axios.get('http://127.0.0.1:8000/coupons/');
    const coupons = response.data;
    const coupon = coupons.find((coupon: { code: string; is_active: boolean; discount_amount: string }) => 
      coupon.code === code && coupon.is_active
    );

    if (!coupon) {
      throw new Error('Invalid coupon code');
    }
    return { discount: parseFloat(coupon.discount_amount) };
  }
);

const couponSlice = createSlice({
  name: 'coupons',
  initialState: {
    discount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    reset(state) {
      state.discount = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discount = action.payload.discount;
        state.error = null;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.discount = 0;
      });
  },
});

export const { reset } = couponSlice.actions;
export default couponSlice.reducer;
