const aiService = require('../services/ai.service');
const { BadRequestError } = require('../utils/errors');
const { successResponse } = require('../utils/response');

const predictPrice = async (req, res, next) => {
  try {
    const { demand_kwh, generation_kwh, hour, day_of_week, previous_price } = req.body;

    if (
      demand_kwh === undefined ||
      generation_kwh === undefined ||
      hour === undefined ||
      day_of_week === undefined ||
      previous_price === undefined
    ) {
      throw new BadRequestError(
        'Required price features missing: demand_kwh, generation_kwh, hour, day_of_week, previous_price'
      );
    }

    const result = await aiService.predictPrice({
      demand_kwh,
      generation_kwh,
      hour,
      day_of_week,
      previous_price,
    });

    return successResponse(res, 'Price prediction computed', result);
  } catch (error) {
    next(error);
  }
};

const predictDemand = async (req, res, next) => {
  try {
    const { hour, day_of_week, temperature, humidity, previous_demand, holiday } = req.body;

    if (
      hour === undefined ||
      day_of_week === undefined ||
      temperature === undefined ||
      humidity === undefined ||
      previous_demand === undefined
    ) {
      throw new BadRequestError(
        'Required demand features missing: hour, day_of_week, temperature, humidity, previous_demand'
      );
    }

    const result = await aiService.predictDemand({
      hour,
      day_of_week,
      temperature,
      humidity,
      previous_demand,
      holiday: holiday || 0,
    });

    return successResponse(res, 'Demand forecast computed', result);
  } catch (error) {
    next(error);
  }
};

const predictGeneration = async (req, res, next) => {
  try {
    const { temperature, humidity, cloud_cover, solar_irradiance, hour, month } = req.body;

    if (
      temperature === undefined ||
      humidity === undefined ||
      cloud_cover === undefined ||
      solar_irradiance === undefined ||
      hour === undefined ||
      month === undefined
    ) {
      throw new BadRequestError(
        'Required generation features missing: temperature, humidity, cloud_cover, solar_irradiance, hour, month'
      );
    }

    const result = await aiService.predictGeneration({
      temperature,
      humidity,
      cloud_cover,
      solar_irradiance,
      hour,
      month,
    });

    return successResponse(res, 'Solar generation forecast computed', result);
  } catch (error) {
    next(error);
  }
};

const getPriceRecommendation = async (req, res, next) => {
  try {
    const result = await aiService.getRecommendedPrice(req.query);
    return successResponse(res, 'AI price recommendation calculated', result);
  } catch (error) {
    next(error);
  }
};

const getAIHealth = async (req, res, next) => {
  try {
    const health = await aiService.checkHealth();
    return successResponse(res, 'AI Service status', health);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  predictPrice,
  predictDemand,
  predictGeneration,
  getPriceRecommendation,
  getAIHealth,
};
