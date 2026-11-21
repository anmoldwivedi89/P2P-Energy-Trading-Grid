import apiClient from './api';

/**
 * Consolidated transactions aur ledger audit trail ke API calls
 */
export const transactionService = {
  // Admin access: Sabhi grid participants ke settled transactions fetch karna
  getAllTransactions: async (params = {}) => {
    return apiClient.get('/transactions', { params });
  },

  // Transaction ID ke through specific record fetch karna
  getTransactionById: async (id) => {
    return apiClient.get(`/transactions/${id}`);
  },

  // User ke apne transactions (buyer + seller) fetch karna
  getUserTransactions: async () => {
    return apiClient.get('/transactions/user');
  },
};
