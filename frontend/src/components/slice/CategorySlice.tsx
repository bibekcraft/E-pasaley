import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Function to fetch categories from the API
const fetchCategoriesByAPI = async () => {
    const response = await fetch('http://127.0.0.1:8000/categories');
    if (!response.ok) {
        throw new Error('Connection Error');    
    }   
    return response.json();
};

// Async thunk for fetching categories
const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const data = await fetchCategoriesByAPI();
    return data;
});

// Creating the slice
const CategorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle', // idle, loading, succeeded, failed
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch categories';
            });
    }
});

// Export the async thunk and the reducer
export default CategorySlice.reducer;
export { fetchCategories };
