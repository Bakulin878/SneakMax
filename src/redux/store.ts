import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import  sneakersSlice  from "./slices/sneakersSlice";
import  teamSlice  from "./slices/teamSlice";

// Создаем Redux-стор с заданными редюсерами
export const store = configureStore({
  reducer: {
    sneakers: sneakersSlice.reducer, // Редюсер для данных о кроссовках 
    team: teamSlice.reducer,  // Редюсер для данных о команде 
  },
});

// Определяем тип корневого состояния Redux
export type RootState = ReturnType<typeof store.getState>;

// Определяем тип для диспетчера Redux
export type AppDispatch = typeof store.dispatch;
