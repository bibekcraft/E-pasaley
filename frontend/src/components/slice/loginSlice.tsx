import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', { username, password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If the server responds with a 401 Unauthorized
        return rejectWithValue('Your details are not correct. Please check your username or password.');
      }
      return rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    resetError: (state) => {
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
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.access);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the custom error message
      });
  },
});

export const { logout, resetError } = loginSlice.actions;
export default loginSlice.reducer;
