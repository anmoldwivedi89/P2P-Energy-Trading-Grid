import apiClient from './api';

export const transactionService = {
  getAllTransactions: async (params = {}) => {
    return apiClient.get('/transactions', { params });
  },

  getTransactionById: async (id) => {
    return apiClient.get(`/transactions/${id}`);
  },

  getUserTransactions: async () => {
    return apiClient.get('/transactions/user');
  },
};
