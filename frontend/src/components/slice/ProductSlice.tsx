import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const fetchProductWithAPI = async (categoryId: number) => {
    const response = await fetch(`http://127.0.0.1:8000/product/?category=${categoryId}`);
    if (!response.ok) {
        throw new Error('Error fetching products');
    }
    return response.json();
};



const fetchProduct = createAsyncThunk<Product[], number>(
    'product/fetchProducts',
    async (categoryId) => {
        const data = await fetchProductWithAPI(categoryId);
        return data;
    }
);

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
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


export default productSlice.reducer;
export { fetchProduct };
