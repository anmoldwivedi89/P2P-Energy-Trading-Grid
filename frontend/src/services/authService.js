import apiClient from './api';

/**
 * Authentication aur user profile management ke API calls
 */
export const authService = {
  // Login credentials verify karwake token lena
  login: async (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  // Naye user ka public account create karna
  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // Current session ke authenticated user ki details fetch karna
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },

  // Authenticated user ki profile details update karna
  updateProfile: async (profileData) => {
    return apiClient.put('/auth/profile', profileData);
  },

  // User session logout
  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  // Admin access: Sabhi registered users ki list fetch karna
  getAllUsers: async () => {
    return apiClient.get('/auth/users');
  },
};
