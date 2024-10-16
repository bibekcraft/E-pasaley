import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSecondCrausel = createAsyncThunk(
    'secondCrausel/fetchSecondCrausel',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/crauselsofdesigns/');
        return response.data;
    }
);

const secondCrauselSlice = createSlice({
    name: 'secondCrausel',
    initialState: {
        secondCrausel: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        reset(state) {
            state.secondCrausel = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSecondCrausel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSecondCrausel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.secondCrausel = action.payload;
                state.error = null;
            })
            .addCase(fetchSecondCrausel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export const { reset } = secondCrauselSlice.actions;
export default secondCrauselSlice.reducer;
