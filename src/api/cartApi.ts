import axios from "axios";
import { Sneaker } from "../types/bean";

const API_URL = "https://70fd489b13cfbfb8.mokky.dev/cart";

// **Добавление товара в корзину**
export const addToCartApi = async (item: Sneaker & { size: number }) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

// **Получение всех товаров в корзине**
export const getCartItemsApi = async (): Promise<Sneaker[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// **Удаление товара из корзины**
export const removeFromCartApi = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

// **Очистка корзины**
export const clearCartApi = async () => {
  await axios.patch(API_URL, []);
};
