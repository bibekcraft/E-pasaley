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
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        // If item already exists in the cart, update the quantity
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // If item doesn't exist in the cart, add it
        state.items.push(action.payload);
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update cart
    },
  },
});

export const { addItem, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
