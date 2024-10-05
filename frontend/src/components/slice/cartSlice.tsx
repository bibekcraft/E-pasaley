import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  itemnumber: unknown;
  quantity: number;
  image: unknown;
  name: unknown;
  brand: unknown;
  final_price: number;
  id: string;
  // Add other properties as needed
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItem[],
  },
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increase quantity if item exists
      } else {
        state.items.push(action.payload); // Add new item if it doesn't exist
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
