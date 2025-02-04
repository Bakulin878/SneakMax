import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Sneaker } from "../../types/bean";
import { addToCartApi, getCartItemsApi, removeFromCartApi, clearCartApi } from "../../api/cartApi";

// **Загрузка товаров в корзине**
export const getCartItems = createAsyncThunk<Sneaker[], void>(
  "cart/fetchCart",
  async () => {
    return await getCartItemsApi();
  }
);

// **Добавление товара в корзину**
export const addToCart = createAsyncThunk<Sneaker, Sneaker & { size: number }>(
  "cart/addToCart",
  async (item) => {
    return await addToCartApi(item);
  }
);

// **Удаление товара из корзины**
export const removeFromCart = createAsyncThunk<void, number>(
  "cart/removeFromCart",
  async (id) => {
    await removeFromCartApi(id);
  }
);

// **Очистка корзины**
export const clearCart = createAsyncThunk<void, void>(
  "cart/clearCart",
  async () => {
    await clearCartApi();
  }
);

// **Тип состояния корзины**
interface CartState {
  cart: Sneaker[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// **Начальное состояние**
const initialState: CartState = {
  cart: [],
  status: "idle",
  error: null,
};

// **Slice Redux**
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.meta.arg);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;
