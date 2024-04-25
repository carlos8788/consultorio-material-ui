import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import turnosService from '../services/api';

export const fetchTurnos = createAsyncThunk('turnos/fetchTurnos', async () => {
  const data = await turnosService.getTurnos();
  console.log(data)
  return data
});

const turnosSlice = createSlice({
  name: 'turnos',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTurnos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTurnos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTurnos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default turnosSlice.reducer;
