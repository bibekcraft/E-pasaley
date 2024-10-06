

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create the login slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetLoginState: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || action.error.message;
            });
    },
});
// Export the actions and reducer
export const { resetLoginState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer; // Ensure this line is present
export default loginSlice.reducer;
