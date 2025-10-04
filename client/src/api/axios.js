import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchItems = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/inventory`);
    return data;
  } catch (error) {
    console.error('Error fetching data', error.message);
    throw error;
  }
};

export const fetchItemsById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/inventory/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data', error.message);
    throw error;
  }
};

export const createItem = async (newitem) => {
  try {
    const { data } = await axios.post(`${API_URL}/inventory`, newitem);
    return data;
  } catch (error) {
    console.error('Error creating item', error.message);
    throw error;
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/inventory/${id}`,
      updatedItem
    );
    return data;
  } catch (error) {
    console.error('Error creating item', error.message);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/inventory/${id}`);
    return data;
  } catch (error) {
    console.error('Error creating item', error.message);
    throw error;
  }
};
