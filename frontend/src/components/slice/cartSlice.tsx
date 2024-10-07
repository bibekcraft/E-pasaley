// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'), // Load cart from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Persist cart
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update cart
    },
  },
});

export const { addItem, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
