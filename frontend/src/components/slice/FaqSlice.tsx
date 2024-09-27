import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const faqs = createAsyncThunk(
    'faq/faqs',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/faqs/');
        const faqs = response.data;
        return faqs;
    }
);

const faqSlice = createSlice({
    name: 'faq',
    initialState: {
        faqs: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        reset(state) {
            state.faqs = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(faqs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(faqs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.faqs = action.payload;
                state.error = null;
            })
            .addCase(faqs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.faqs = [];
            });
    },
});

export const { reset } = faqSlice.actions;
export default faqSlice.reducer;