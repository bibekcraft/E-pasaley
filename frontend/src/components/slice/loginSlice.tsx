// src/components/slice/loginSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', { username, password });
    return response.data; // Adjust this to your response structure
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'), // Check if token exists on initial load
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null; // Clear error on logout
      localStorage.removeItem('token'); // Clear the token from local storage
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
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.access); // Store the access token
        // Optional: If your backend returns a refresh token, you can store that as well
        if (action.payload.refresh) {
          localStorage.setItem('refreshToken', action.payload.refresh);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { resetError, logout } = loginSlice.actions;
export default loginSlice.reducer;
