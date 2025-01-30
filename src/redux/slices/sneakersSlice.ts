import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSneakers } from '../../api/sneakersApi';

export const getSneakers = createAsyncThunk(
  'sneakers/getSneakers',
  async (filters: Record<string, any>) => {
    const response = await fetchSneakers(filters);
    return response;
  }
);

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState: { sneakers: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSneakers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSneakers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sneakers = action.payload;
      })
      .addCase(getSneakers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllSneakers = (state) => state.sneakers.sneakers;
export default sneakersSlice.reducer;
