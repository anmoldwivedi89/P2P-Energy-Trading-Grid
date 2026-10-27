const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// AI Service Health Check
router.get('/health', aiController.getAIHealth);

// Predict Price (strict payload)
router.post('/predict-price', aiController.predictPrice);

// Predict Demand (strict payload)
router.post('/predict-demand', aiController.predictDemand);

// Predict Solar Generation (strict payload)
router.post('/predict-generation', aiController.predictGeneration);

// Frontend compatibility bridge: GET /api/ai/price-recommendation
router.get('/price-recommendation', aiController.getPriceRecommendation);

module.exports = router;
