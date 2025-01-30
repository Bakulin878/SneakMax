import axios from 'axios';

const API_URL = 'https://70fd489b13cfbfb8.mokky.dev/team';

export const fetchTeam = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};
