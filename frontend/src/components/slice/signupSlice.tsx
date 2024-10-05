import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for signing up a user
export const fetchSignup = createAsyncThunk(
  'signup/fetchSignup',
  async (signupData: any, { rejectWithValue }) => {
    try {
      // Make the POST request to the signup endpoint
      const response = await axios.post('http://127.0.0.1:8000/register/', signupData);
      return response.data; // Return the response data when the request succeeds
    } catch (error: any) {
      // If there's an error, pass the error message to rejectWithValue
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Define the initial state
const initialState = {
  user: null,
  status: 'idle',
  error: null as string | null, // Set the error type explicitly
};

// Create the signup slice
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignup.pending, (state) => {
        state.status = 'loading'; // Set status to loading while the request is pending
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when the request is fulfilled
        state.user = action.payload; // Update the state with the user data
      })
      .addCase(fetchSignup.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed when the request is rejected
        state.error = action.payload as string; // Update the state with the error message
      });
  },
});

// Export the reducer to be included in the Redux store
export default signupSlice.reducer;
