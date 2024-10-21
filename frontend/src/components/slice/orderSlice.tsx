import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a Product interface for better type safety
interface Product {
  itemnumber: string;
  final_price: number;
  quantity: number;
  total: string;
}

// Define the structure for the order state
interface OrderState {
  personalDetails: { firstName: string; lastName: string; email: string; phone: string };
  shippingAddress: { addressLine: string; city: string; state: string; zipCode: string };
  quantities: number[];
  total: number;
  loading: boolean; // For loading state
  error: string | null; // For error handling
  orderId?: string | null; // Store the order ID or confirmation number
}

// Initial state of the order
const initialState: OrderState = {
  personalDetails: { firstName: '', lastName: '', email: '', phone: '' },
  shippingAddress: { addressLine: '', city: '', state: '', zipCode: '' },
  quantities: [],
  total: 0,
  loading: false,
  error: null,
  orderId: null,
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
    products: Product[];
  }) => {
    const response = await axios.post('http://127.0.0.1:8000/orders/', orderData);
    return response.data; // Ensure your API returns a consistent structure
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    clearCart(state) {
      state.quantities = [];
      state.total = 0;
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload.id; // Assuming your API returns an id
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


// Export actions and reducer
export const { setPersonalDetails, setShippingAddress, setTotal, clearCart } = orderSlice.actions;
export default orderSlice.reducer;
