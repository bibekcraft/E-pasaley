import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

// Define the Product interface
interface Product {
    itemnumber: ReactNode;
    feature: ReactNode;
    description: ReactNode;
    categoryId: number;
    image: string | undefined;
    initial_price: number;
    discount_rate: number;
    final_price: number;
    brand: string;
    id: number;
    name: string;
}

// Define the initial state for the slice
interface ProductState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    status: 'idle',
    error: null,
};

// Async function to fetch products from the API
const fetchProductWithAPI = async (categoryId: number) => {
    const response = await fetch(`http://127.0.0.1:8000/products/?category=${categoryId}`);
    if (!response.ok) {
        throw new Error('Error fetching products');
    }
    return response.json();
};

// Create an async thunk for fetching products
const fetchProduct = createAsyncThunk<Product[], number>(
    'product/fetchProducts',
    async (categoryId) => {
        const data = await fetchProductWithAPI(categoryId);
        return data;
    }
);

// Create the slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    }
});

// Export the async thunk and the reducer
export default productSlice.reducer;
export { fetchProduct };
