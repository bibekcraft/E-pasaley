import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface Product {
    image1: any;
    image3: any;
    image2: any;
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

const fetchProductWithAPI = async (categoryId: number) => {
    const response = await fetch(`http://127.0.0.1:8000/products/?category=${categoryId}`);
    if (!response.ok) {
        throw new Error('Error fetching products');
    }
    return response.json();
};

const fetchProduct = createAsyncThunk<Product[], number>(
    'product/fetchProducts',
    async (categoryId) => {
        const response = await fetchProductWithAPI(categoryId);
        console.log(response); // Log the response here
        return response;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
                console.log('Loading products...');
            })
            .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
                console.log('Fetched products:', action.payload);
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
                console.log('Error fetching products:', action.error.message);
            });
    }
    
});

export default productSlice.reducer;
export { fetchProduct };
