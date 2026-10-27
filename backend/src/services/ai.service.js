const axios = require('axios');
const config = require('../config/env');

class AIService {
  constructor() {
    this.client = axios.create({
      baseURL: config.aiServiceUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Check if the Python AI service is reachable
   */
  async checkHealth() {
    try {
      const response = await this.client.get('/health');
      return { isAvailable: true, data: response.data };
    } catch (error) {
      return { isAvailable: false, error: error.message };
    }
  }

  /**
   * Predict price using the Python price model
   * @param {Object} params { demand_kwh, generation_kwh, hour, day_of_week, previous_price }
   */
  async predictPrice(params) {
    try {
      const response = await this.client.post('/predict/price', {
        demand_kwh: Number(params.demand_kwh),
        generation_kwh: Number(params.generation_kwh),
        hour: parseInt(params.hour, 10),
        day_of_week: parseInt(params.day_of_week, 10),
        previous_price: Number(params.previous_price),
      });
      return response.data;
    } catch (error) {
      this._handleAIError(error, 'price prediction');
    }
  }

  /**
   * Predict demand using the Python demand model
   * @param {Object} params { hour, day_of_week, temperature, humidity, previous_demand, holiday }
   */
  async predictDemand(params) {
    try {
      const response = await this.client.post('/predict/demand', {
        hour: parseInt(params.hour, 10),
        day_of_week: parseInt(params.day_of_week, 10),
        temperature: Number(params.temperature),
        humidity: Number(params.humidity),
        previous_demand: Number(params.previous_demand),
        holiday: parseInt(params.holiday || 0, 10),
      });
      return response.data;
    } catch (error) {
      this._handleAIError(error, 'demand prediction');
    }
  }

  /**
   * Predict generation using the Python generation model
   * @param {Object} params { temperature, humidity, cloud_cover, solar_irradiance, hour, month }
   */
  async predictGeneration(params) {
    try {
      const response = await this.client.post('/predict/generation', {
        temperature: Number(params.temperature),
        humidity: Number(params.humidity),
        cloud_cover: Number(params.cloud_cover),
        solar_irradiance: Number(params.solar_irradiance),
        hour: parseInt(params.hour, 10),
        month: parseInt(params.month, 10),
      });
      return response.data;
    } catch (error) {
      this._handleAIError(error, 'generation prediction');
    }
  }

  /**
   * Resolve context and get price recommendation (used by GET /api/ai/price-recommendation)
   */
  async getRecommendedPrice(queryParams = {}) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDayOfWeek = (now.getDay() + 6) % 7; // Convert JS Sun=0 to Mon=0

    // Sensible microgrid defaults for parameters prosumer UI does not have
    const demand_kwh = queryParams.demand_kwh ? Number(queryParams.demand_kwh) : 3.5;
    const generation_kwh = queryParams.generation_kwh ? Number(queryParams.generation_kwh) : 2.5;
    const hour = queryParams.hour !== undefined ? parseInt(queryParams.hour, 10) : currentHour;
    const day_of_week = queryParams.day_of_week !== undefined ? parseInt(queryParams.day_of_week, 10) : currentDayOfWeek;
    const previous_price = queryParams.previous_price ? Number(queryParams.previous_price) : 7.00;

    try {
      const prediction = await this.predictPrice({
        demand_kwh,
        generation_kwh,
        hour,
        day_of_week,
        previous_price,
      });

      return {
        status: 'success',
        source: 'ml_model',
        recommended_price_per_kwh: prediction.recommended_price_per_kwh,
        recommendedPricePerKwh: prediction.recommendedPricePerKwh || prediction.recommended_price_per_kwh,
        currency: 'INR',
        unit: 'kWh',
        context: {
          hour,
          day_of_week,
          demand_kwh,
          generation_kwh,
          previous_price,
        },
      };
    } catch (error) {
      // Graceful fallback per SRS FR-12 when AI service is unavailable
      console.warn(`[AIService Fallback] ${error.message}. Returning baseline grid rate.`);
      const fallbackRate = 7.00; // Baseline grid tariff rate
      return {
        status: 'fallback',
        source: 'baseline_tariff',
        message: 'AI prediction service temporarily unavailable; using regional baseline tariff.',
        recommended_price_per_kwh: fallbackRate,
        recommendedPricePerKwh: fallbackRate,
        currency: 'INR',
        unit: 'kWh',
        context: {
          hour,
          day_of_week,
          demand_kwh,
          generation_kwh,
          previous_price,
        },
      };
    }
  }

  _handleAIError(error, operation) {
    if (error.response) {
      const detail = error.response.data?.detail || error.response.data?.message || error.message;
      const err = new Error(`AI Service error during ${operation}: ${detail}`);
      err.statusCode = error.response.status;
      throw err;
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      let targetPort = '8001';
      try {
        targetPort = new URL(config.aiServiceUrl).port || '8001';
      } catch {}
      const err = new Error(
        `AI Service is unreachable at ${config.aiServiceUrl}. Please start the Python service via: uvicorn api.main:app --port ${targetPort}`
      );
      err.statusCode = 503;
      throw err;
    } else {
      const err = new Error(`AI Service request failed during ${operation}: ${error.message}`);
      err.statusCode = 500;
      throw err;
    }
  }
}

module.exports = new AIService();
