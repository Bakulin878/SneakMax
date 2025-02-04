import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeam } from "../../api/teamApi";
import { TeamMember } from "../../types/bean"; // Импортируем тип

// Асинхронный thunk для загрузки данных о команде
export const getTeam = createAsyncThunk<TeamMember[]>(
  "team/fetchTeam",
  async () => {
    return await fetchTeam(); // Запрос к API
  }
);

// Начальное состояние Redux-хранилища для команды
interface TeamState {
  team: TeamMember[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TeamState = {
  team: [],
  status: "idle",
  error: null,
};

// Создаём `teamSlice`
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.team = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки команды";
      });
  },
});

// Экспортируем редуктор для Redux Store
export default teamSlice.reducer;
