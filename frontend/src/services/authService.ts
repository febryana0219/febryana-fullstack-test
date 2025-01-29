import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register(name: string, email: string, password: string) {
    return apiClient.post('/users/register', { name, email, password });
  },
  login(email: string, password: string) {
    return apiClient.post('/users/login', { email, password });
  },
};
