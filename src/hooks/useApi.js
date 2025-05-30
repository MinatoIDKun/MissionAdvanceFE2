import axios from "axios";
import { API_ENDPOINT } from "../services/api/api";

// GET
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT.USER}`);
    return response.data;
  } catch (error) {
    console.error("Error saat mengambil data pengguna:", error);
    throw error;
  }
};

// POST
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_ENDPOINT.USER}`, userData);
    return response.data; 
  } catch (error) {
    console.error("Error saat menambahkan pengguna baru:", error);
    throw error;
  }
};

// DELETE
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINT.USER}${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error saat menghapus pengguna:", error);
    throw error;
  }
};

// UPDATE
export const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`${API_ENDPOINT.USER}${userId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error saat memperbarui pengguna:", error);
      throw error;
    }
  };
  
