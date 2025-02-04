import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderApi, getOrdersApi } from "../../api/orderApi";
import { Order } from "../../types/bean";

// **Тип заказчика**
// interface Customer {
//   name: string;
//   phone: string;
//   email: string;
// }

// **Тип товара в заказе**
// interface OrderItem {
//   id: number;
//   title: string;
//   price: number;
//   size: number;
// }

// **Тип заказа**
// interface Order {
//   orderNumber: number;
//   items: OrderItem[];
//   totalPrice: number;
//   customer: Customer;
//   id?: number;
// }

// **Загрузка всех заказов**
export const getOrders = createAsyncThunk<Order[], void>(
  "orders/fetchOrders",
  async () => {
    return await getOrdersApi();
  }
);

// **Оформление нового заказа**
export const placeOrder = createAsyncThunk<void, Order>(
  "orders/placeOrder",
  async (orderData) => {
    await placeOrderApi(orderData); // ✅ Теперь возвращает void
  }
);

// **Тип состояния Redux**
interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// **Начальное состояние**
const initialState: OrdersState = {
  orders: [],
  status: "idle",
  error: null,
};

// **Slice Redux**
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки заказов.";
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.orders = [];
      });
  },
});

export default ordersSlice.reducer;
