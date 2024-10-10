import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface OrderState {
  personalDetails: { firstName: string; lastName: string; email: string; phone: string };
  shippingAddress: { addressLine: string; city: string; state: string; zipCode: string };
  quantities: number[];
  total: number;
  loading: boolean; // For loading state
  error: string | null; // For error handling
}

const initialState: OrderState = {
  personalDetails: { firstName: '', lastName: '', email: '', phone: '' },
  shippingAddress: { addressLine: '', city: '', state: '', zipCode: '' },
  quantities: [],
  total: 0,
  loading: false,
  error: null,
};

// Create an async thunk for submitting the order
export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    zipCode: string;
    total: number;
    products: { itemnumber: string; final_price: number; quantity: number; total: string }[];
  }) => {
    const response = await axios.post('http://127.0.0.1:8000/orders/', orderData);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPersonalDetails(state, action: PayloadAction<OrderState['personalDetails']>) {
      state.personalDetails = action.payload;
    },
    setShippingAddress(state, action: PayloadAction<OrderState['shippingAddress']>) {
      state.shippingAddress = action.payload;
    },
    setQuantities(state, action: PayloadAction<number[]>) {
      state.quantities = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new submission
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally handle successful submission (e.g., reset state)
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit order';
      });
  },
});

// Export actions
export const { setPersonalDetails, setShippingAddress, setQuantities, setTotal } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
