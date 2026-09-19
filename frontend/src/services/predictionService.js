import apiClient from './api';

/**
 * Placeholder service for future AI / Machine Learning endpoints
 * (energy demand forecast, dynamic price recommendation, solar generation prediction)
 */
export const predictionService = {
  // Recommend optimal energy price based on historical demand and time
  getPriceRecommendation: async (params) => {
    // Placeholder - connected to energy_ai service later
    return apiClient.get('/ai/price-recommendation', { params });
  },

  // Forecast future energy generation (e.g., solar/wind)
  getEnergyForecast: async (params) => {
    // Placeholder - connected to energy_ai service later
    return apiClient.get('/ai/forecast', { params });
  },

  // Predict market demand trends
  getDemandPrediction: async (params) => {
    // Placeholder - connected to energy_ai service later
    return apiClient.get('/ai/demand-prediction', { params });
  },
};
