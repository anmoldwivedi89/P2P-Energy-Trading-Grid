import apiClient from './api';

export const orderService = {
  createOrder: async (orderData) => {
    return apiClient.post('/orders', orderData);
  },

  getOrderById: async (id) => {
    return apiClient.get(`/orders/${id}`);
  },

  getBuyerOrders: async () => {
    return apiClient.get('/orders/buyer/my-orders');
  },

  getSellerOrders: async () => {
    return apiClient.get('/orders/seller/my-orders');
  },

  updateOrderStatus: async (id, status) => {
    return apiClient.patch(`/orders/${id}/status`, { status });
  },
};
