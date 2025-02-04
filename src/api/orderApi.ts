import axios from "axios";
import { Order } from "../types/bean"; // ✅ Импортируем тип

const API_URL = "https://70fd489b13cfbfb8.mokky.dev/orders";

// **Запрос на получение всех заказов**
export const getOrdersApi = async (): Promise<Order[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// **Запрос на оформление заказа**
export const placeOrderApi = async (orderData: Order): Promise<Order> => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};
