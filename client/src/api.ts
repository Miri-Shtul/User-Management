import axios from 'axios';
import { UsersResponse } from './classes';

const API_URL = 'http://localhost:5000/api';

export const api = {
    getUsers: async (page: number = 1, limit: number = 5): Promise<UsersResponse> => {
        const response = await axios.get(`${API_URL}/users?page=${page}&limit=${limit}`);
        return response.data.data; // Extract the data from the success response
    },

    createUser: async (user: { firstName: string; lastName: string; email: string; password: string }) => {
        console.log("Creating user", user);
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data.data;
    },

    deleteUser: async (id: string) => {
        await axios.delete(`${API_URL}/users/${id}`);
    }
};