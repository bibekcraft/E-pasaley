// src/slices/registerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegisterState {
  user: null | { email: string };
  loading: boolean;
  error: null | string;
}

// Define the initial state
const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
};

// Create an async thunk for registration
// Create an async thunk for registration
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData: { email: string; password: string; confirm_password: string; username: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register/', userData);
      return response.data; // Assume the response contains user data
    } catch (error) {
      // Handle errors
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      return rejectWithValue(message);
    }
  }
);

// Create the slice
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Handle the user data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store the error message
      });
  },
});

// Export the actions and reducer
export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;