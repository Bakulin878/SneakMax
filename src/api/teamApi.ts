import axios from "axios";

const API_URL = "https://70fd489b13cfbfb8.mokky.dev";

export const fetchTeam = async () => {
  try {
    const response = await axios.get(`${API_URL}/team`);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка загрузки данных о команде.");
    console.error("Ошибка загрузки команды:", error);
  }
};
