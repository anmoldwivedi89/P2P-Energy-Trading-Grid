import apiClient from './api';

/**
 * Marketplace listings management ke API calls
 */
export const listingService = {
  // Filters ke basis par active energy listings fetch karna
  getAllListings: async (filters = {}) => {
    return apiClient.get('/listings', { params: filters });
  },

  // Single listing details fetch karna
  getListingById: async (id) => {
    return apiClient.get(`/listings/${id}`);
  },

  // Prosumer dwara naya energy batch create karna
  createListing: async (listingData) => {
    return apiClient.post('/listings', listingData);
  },

  // Listing price ya units update karna
  updateListing: async (id, listingData) => {
    return apiClient.put(`/listings/${id}`, listingData);
  },

  // Listing ko cancel karna
  deleteListing: async (id) => {
    return apiClient.delete(`/listings/${id}`);
  },

  // Seller ki apni publish ki hui listings fetch karna
  getMyListings: async () => {
    return apiClient.get('/listings/seller/my-listings');
  },
};
