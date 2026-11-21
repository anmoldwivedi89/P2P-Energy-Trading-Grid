const axios = require('axios');
const config = require('../config/env');

class AIService {
  constructor() {
    // Python FastAPI microservice ke sath communication ke liye HTTP client setup
    this.client = axios.create({
      baseURL: config.aiServiceUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Check karte hain ki Python AI microservice reachable hai ya nahi
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
   * Python ML model se recommended price predict karwate hain
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
   * Area demand predict karte hain
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
   * Weather aur solar irradiance ke basis par generation estimate karte hain
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
   * Frontend compatibility bridge: agar Python service down ho toh baseline tariff return karta hai
   */
  async getRecommendedPrice(queryParams = {}) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDayOfWeek = (now.getDay() + 6) % 7; // Sunday=0 ko standard Monday=0 format mein convert kar rahe hain

    // Sensible defaults use karte hain agar UI se data na aaye
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
      // Graceful fallback: agar AI microservice offline ho toh baseline grid tariff (₹7/kWh) use hota hai
      console.warn(`[AIService Fallback] ${error.message}. Baseline grid tariff return kar rahe hain.`);
      const fallbackRate = 7.00;
      return {
        status: 'fallback',
        source: 'baseline_tariff',
        message: 'AI prediction service offline hai; regional baseline tariff apply kar rahe hain.',
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
        `AI Service unreachable hai at ${config.aiServiceUrl}. Python microservice start karein via: uvicorn api.main:app --port ${targetPort}`
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
