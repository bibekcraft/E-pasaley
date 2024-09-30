import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to submit order data (shipping, personal, and order list details)
export const submitOrder = createAsyncThunk(
    'order/submitOrder',
    async (orderData: unknown, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/orders/', orderData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

// Order slice
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [] as unknown[], // Define the type of the orders array
        ordersList: {
            itemnumber: '',
            price: '',
            total: '',
            quantity: '',
        },
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
        error: null as string | null,
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
        // Set order list details
        setOrderList(state, action) {
            state.ordersList = { ...state.ordersList, ...action.payload };
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
            state.ordersList = {
                itemnumber: '',
                price: '',
                total: '',
                quantity: '',
            };
            state.total = 0;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(submitOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload); // Assuming the response contains the submitted order
                state.error = null;
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string | null;
            });
    },
});

// Export actions
export const { setPersonalDetails, setShippingAddress, setOrderList, setTotal, reset } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
