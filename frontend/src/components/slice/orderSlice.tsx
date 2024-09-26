import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// Fetch orders from API
const fetchOrdersByAPI = async () => {
    const response = await fetch('http://127.0.0.1:8000/orders/');
    if (!response.ok) {
        throw new Error('Connection Error');
    }
    return response.json();
};

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const data = await fetchOrdersByAPI();
    return data;
});

// Order slice

interface CartItem {
    id: string;
    title: string;
    final_rate: string;
    quantity: number;
}

const initialState = {
    cartItems: [] as CartItem[],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems.push(action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    }
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
