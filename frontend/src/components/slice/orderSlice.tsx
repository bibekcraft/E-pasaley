// orderSlice.ts or orderSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  personalDetails: { firstName: string; lastName: string; email: string; phone: string };
  shippingAddress: { addressLine: string; city: string; state: string; zipCode: string };
  total: number;
  quantities: number[]; // Add quantities to state
}

const initialState: OrderState = {
  personalDetails: { firstName: '', lastName: '', email: '', phone: '' },
  shippingAddress: { addressLine: '', city: '', state: '', zipCode: '' },
  total: 0,
  quantities: [], // Initialize quantities
};

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
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setQuantities(state, action: PayloadAction<number[]>) {
      state.quantities = action.payload; // Add a reducer for quantities
    },
  },
});

export const { setPersonalDetails, setShippingAddress, setTotal, setQuantities } = orderSlice.actions;
export default orderSlice.reducer;
