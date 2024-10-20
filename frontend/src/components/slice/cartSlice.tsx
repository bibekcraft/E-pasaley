// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  final_price: number;
  quantity: number; // Ensure quantity is defined here
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]').map((item: Product) => ({
    ...item,
    quantity: item.quantity || 1, // Default quantity to 1 if not set
  })),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        // If item already exists in the cart, update the quantity
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // If item doesn't exist in the cart, add it
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 }); // Ensure quantity is set
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update localStorage on add
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update cart in localStorage
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cart'); // Clear localStorage
    },
  },
});

export const { addItem, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
