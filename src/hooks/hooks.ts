import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store"; // ✅ Указываем путь к store.ts

// Кастомный `dispatch`, который знает о Thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Кастомный `useSelector`, чтобы не указывать тип каждый раз
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
