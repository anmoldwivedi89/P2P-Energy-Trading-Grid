import apiClient from './api';

/**
 * AI / ML prediction microservice integration ke API calls
 */
export const predictionService = {
  // Time aur demand ke hisab se recommended dynamic rate fetch karna (with baseline fallback)
  getPriceRecommendation: async (params) => {
    return apiClient.get('/ai/price-recommendation', { params });
  },

  // Weather parameters se solar/wind energy generation forecast karna
  getGenerationForecast: async (data) => {
    return apiClient.post('/ai/predict-generation', data);
  },

  // Area electricity demand trend predict karna
  getDemandPrediction: async (data) => {
    return apiClient.post('/ai/predict-demand', data);
  },

  // Machine learning price model se exact rate calculate karwana
  predictPrice: async (data) => {
    return apiClient.post('/ai/predict-price', data);
  },
};
