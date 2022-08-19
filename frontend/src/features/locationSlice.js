import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../app/connector';

const initialState = {
    locations: []
};

export const fetchLocations = createAsyncThunk(
    'location/fetchLocations',
    async () => {
        const response = await axios.get('/api/locations');
        return response.data;
    }
);

export const locationSlice = createSlice({
    name: 'counter',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.locations = action.payload;
            });
    },
});

export default locationSlice.reducer;