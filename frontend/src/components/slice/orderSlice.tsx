import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/orders/');
        return response.data;
    }
);

// Order slice
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        personalDetails: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        shippingAddress: {
            addressLine: '',
            city: '',
            state: '',
            zipCode: '',
        },
        total: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        // Set personal details
        setPersonalDetails(state, action) {
            state.personalDetails = { ...state.personalDetails, ...action.payload };
        },
        // Set shipping address
        setShippingAddress(state, action) {
            state.shippingAddress = { ...state.shippingAddress, ...action.payload };
        },
        // Set total
        setTotal(state, action) {
            state.total = action.payload;
        },
        // Reset order state
        reset(state) {
            state.orders = [];
            state.personalDetails = {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            };
            state.shippingAddress = {
                addressLine: '',
                city: '',
                state: '',
                zipCode: '',
            };
            state.total = 0;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.orders = [];
            });
    },
});

// Export actions
export const { setPersonalDetails, setShippingAddress, setTotal, reset } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
