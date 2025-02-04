import axios from "axios";
import { Sneaker } from "../types/bean";

const API_URL = "https://70fd489b13cfbfb8.mokky.dev/sneakers";

// **Получение всех товаров**
export const fetchSneakers = async (): Promise<Sneaker[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// **Запрос для загрузки одного товара по ID**
export const fetchSneakerById = async (id: number): Promise<Sneaker> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// **Фильтрация товаров через API**
export const fetchFilteredSneakers = async (
  min: number,
  max: number,
  man: boolean,
  woman: boolean,
  sizes: number[]
): Promise<Sneaker[]> => {
  let genderQuery = "";
  const sizeQuery = sizes.map((size) => `&sizes[]=${size}`).join("");

  if (man && !woman) genderQuery = "&gender=Мужской";
  else if (!man && woman) genderQuery = "&gender=Женский";

  const url = `${API_URL}?price[from]=${min}&price[to]=${max}${genderQuery}${sizeQuery}`;
  const response = await axios.get(url);
  return response.data;
};