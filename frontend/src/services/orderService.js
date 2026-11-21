import apiClient from './api';

/**
 * P2P energy orders aur atomic settlement ke API calls
 */
export const orderService = {
  // Naya P2P energy purchase order create karna (atomic stock decrement ke sath)
  createOrder: async (orderData) => {
    return apiClient.post('/orders', orderData);
  },

  // Specific order details fetch karna
  getOrderById: async (id) => {
    return apiClient.get(`/orders/${id}`);
  },

  // Buyer ke dwara khareede gaye energy orders fetch karna
  getBuyerOrders: async () => {
    return apiClient.get('/orders/buyer/my-orders');
  },

  // Seller ke dwara receive kiye gaye energy sales fetch karna
  getSellerOrders: async () => {
    return apiClient.get('/orders/seller/my-orders');
  },

  // Order status update ya cancel karna
  updateOrderStatus: async (id, status) => {
    return apiClient.patch(`/orders/${id}/status`, { status });
  },
};
