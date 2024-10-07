// loginSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', { username, password });
    return response.data; // Return user data or tokens as needed
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new login attempt
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Set this to true upon successful login
        // You can also store user data or tokens in the state if needed
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });
  },
});

export const { resetError } = loginSlice.actions;
export default loginSlice.reducer;
