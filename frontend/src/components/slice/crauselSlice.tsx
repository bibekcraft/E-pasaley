import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCrausel = createAsyncThunk(
    'crausel/fetchCrausel',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/crausels/');
        return response.data;
    }
);

const crauselSlice = createSlice({
    name: 'crausel',
    initialState: {
        crausel: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        reset(state) {
            state.crausel = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrausel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCrausel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.crausel = action.payload;
                state.error = null;
            })
            .addCase(fetchCrausel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export const { reset } = crauselSlice.actions;
export default crauselSlice.reducer;
