import { configureStore } from "@reduxjs/toolkit";
import sneakersReducer from "./slices/sneakersSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/ordersSlice";
import teamReducer from "./slices/teamSlice";

const store = configureStore({
  reducer: {
    sneakers: sneakersReducer,
    cart: cartReducer,
    orders: ordersReducer,
    team: teamReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
