import apiClient from './api';

export const authService = {
  login: async (credentials) => {
    // Placeholder for backend API integration
    return apiClient.post('/auth/login', credentials);
  },

  register: async (userData) => {
    // Placeholder for backend API integration
    return apiClient.post('/auth/register', userData);
  },

  getCurrentUser: async () => {
    // Placeholder for backend API integration
    return apiClient.get('/auth/me');
  },

  logout: async () => {
    // Placeholder for backend API integration
    return apiClient.post('/auth/logout');
  },
};
