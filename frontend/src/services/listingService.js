import apiClient from './api';

export const listingService = {
  getAllListings: async (filters = {}) => {
    return apiClient.get('/listings', { params: filters });
  },

  getListingById: async (id) => {
    return apiClient.get(`/listings/${id}`);
  },

  createListing: async (listingData) => {
    return apiClient.post('/listings', listingData);
  },

  updateListing: async (id, listingData) => {
    return apiClient.put(`/listings/${id}`, listingData);
  },

  deleteListing: async (id) => {
    return apiClient.delete(`/listings/${id}`);
  },

  getMyListings: async () => {
    return apiClient.get('/listings/seller/my-listings');
  },
};
