const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// AI microservice health check endpoint
router.get('/health', aiController.getAIHealth);

// Machine learning dynamic price prediction endpoint
router.post('/predict-price', aiController.predictPrice);

// Local grid electricity demand forecast endpoint
router.post('/predict-demand', aiController.predictDemand);

// Solar PV generation output forecast endpoint
router.post('/predict-generation', aiController.predictGeneration);

// Frontend compatibility bridge: GET request ke zariye recommended baseline tariff fetch karna
router.get('/price-recommendation', aiController.getPriceRecommendation);

module.exports = router;
