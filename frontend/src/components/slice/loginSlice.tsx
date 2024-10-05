import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { reset as resetCoupon } from '../slice/CouponSlice'; // Adjust the import path as necessary

export const fetchLogin = createAsyncThunk('login/fetchLogin', async (loginData, { dispatch }) => {
  const response = await axios.post('http://127.0.0.1:8000/login/', loginData);
  dispatch(resetCoupon()); // Dispatch the reset action for coupons
  return response.data;
});

const initialState = {
  items: [],
  status: sessionStorage.getItem('loggedIn') === 'true' ? 'succeeded' : 'idle',
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      sessionStorage.removeItem('loggedIn');
      state.status = 'idle';
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        sessionStorage.setItem('loggedIn', 'true');
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;