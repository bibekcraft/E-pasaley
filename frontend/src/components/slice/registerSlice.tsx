import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register/', userData);
      return response.data; // Return user data on successful registration
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Registration failed'); // Handle error
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // Registration was successful
        state.userInfo = payload; // Save user data
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // Save error message
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
