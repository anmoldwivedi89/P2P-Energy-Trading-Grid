const { BadRequestError } = require('../utils/errors');

/**
 * Validate required fields in req.body
 * @param {Array<string>} requiredFields
 */
const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return next(
        new BadRequestError(`Missing required fields: ${missing.join(', ')}`, {
          missingFields: missing,
        })
      );
    }
    next();
  };
};

module.exports = {
  validateBody,
};
