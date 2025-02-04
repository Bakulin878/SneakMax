import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Sneaker } from "../../types/bean";
import { fetchSneakers, fetchFilteredSneakers, fetchSneakerById } from "../../api/sneakersApi";

// **Тип состояния Redux**
interface SneakersState {
  sneakers: Sneaker[];
  selectedSneaker: Sneaker | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// **Начальное состояние**
const initialState: SneakersState = {
  sneakers: [],
  selectedSneaker: null,
  status: "idle",
  error: null,
};

// **Асинхронная загрузка всех товаров**
export const getSneakers = createAsyncThunk<Sneaker[], void>(
  "sneakers/fetchSneakers",
  async () => {
    return await fetchSneakers();
  }
);

// **Асинхронная загрузка одного товара по ID**
export const getSneakerById = createAsyncThunk<Sneaker, number>(
  "sneakers/fetchSneakerById",
  async (id) => {
    return await fetchSneakerById(id);
  }
);

// **Фильтрация товаров**
export const filterSneakers = createAsyncThunk<
  Sneaker[],
  { min: number; max: number; man: boolean; woman: boolean; sizes: number[] }
>("sneakers/filterSneakers", async ({ min, max, man, woman, sizes }) => {
  return await fetchFilteredSneakers(min, max, man, woman, sizes);
});

// **Slice Redux**
const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSneakers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSneakers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sneakers = action.payload;
      })
      .addCase(getSneakers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки.";
      })
      .addCase(filterSneakers.fulfilled, (state, action: PayloadAction<Sneaker[]>) => {
        state.sneakers = action.payload;
      })
      .addCase(getSneakerById.fulfilled, (state, action) => {
        state.selectedSneaker = action.payload; // ✅ Загружаем товар в `selectedSneaker`
      });
  },
});

export default sneakersSlice.reducer;
