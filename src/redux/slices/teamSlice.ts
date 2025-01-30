import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeam } from '../../api/teamApi';

export const getTeam = createAsyncThunk(
  'team/getTeam',
  async (filters: Record<string, any>) => {
    const response = await fetchTeam(filters);
    return response;
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState: { team: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.team = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllSneakers = (state) => state.team.team;
export default teamSlice.reducer;
