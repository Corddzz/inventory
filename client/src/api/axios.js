import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchItems = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/inventory`);
    return data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

export const addItem = async (item) => {
  try {
    const { data } = await axios.post(`${API_URL}/inventory`, item);
    return data;
  } catch (error) {
    console.error('Error adding item', error);
    throw error;
  }
};
