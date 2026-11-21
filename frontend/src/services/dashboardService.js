import api from '@/lib/axios';

// Buyer dashboard telemetry aur real-time orders fetch karne ka function
export async function getBuyerDashboard() {
  const response = await api.get('/buyer/dashboard');
  return response.data || response;
}

// Seller prosumer dashboard metrics aur active listings fetch karne ka function
export async function getSellerDashboard() {
  const response = await api.get('/seller/dashboard');
  return response.data || response;
}

// Admin portal ke consolidated grid metrics aur live transactions fetch karne ka function
export async function getAdminDashboard() {
  const response = await api.get('/admin/dashboard');
  return response.data || response;
}

export default {
  getBuyerDashboard,
  getSellerDashboard,
  getAdminDashboard,
};
