import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching testimonials
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/testimonials/');
    console.log('API Response:', response.data); // Log API response to check for duplicates
    return response.data; // The payload of fulfilled action will be this data
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    testimonials: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        console.log('Fetched Testimonials:', action.payload); // Log fetched data for duplicates
        state.status = 'succeeded';
        state.testimonials = action.payload; // Add the fetched testimonials to the state
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default testimonialsSlice.reducer;
