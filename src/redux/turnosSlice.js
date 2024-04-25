import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import turnosService from '../services/api';

export const fetchTurnos = createAsyncThunk('turnos/fetchTurnos', async () => {
  const data = await turnosService.getTurnos();
  return data
});

const turnosSlice = createSlice({
  name: 'turnos',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, 
    currentUser: null
  },
  reducers: {
    getPaciente: (state, action) => {
      const paciente = state.data.turnos.find(turno => turno.paciente._id.toString() === action.payload.id)
      console.log(paciente)
      state.currentUser = paciente
    },
    cleanPaciente: (state, action) => {
      state.currentUser = null
    }
  },
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
export const {getPaciente, cleanPaciente} = turnosSlice.actions
export default turnosSlice.reducer;
