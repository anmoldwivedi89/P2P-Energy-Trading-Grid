/**
 * Standardized API response format
 */
const sendResponse = (res, statusCode, success, message, data = null, meta = null) => {
  const payload = {
    success,
    message,
  };

  if (data !== null) {
    payload.data = data;
  }

  if (meta !== null) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

const successResponse = (res, message, data = null, statusCode = 200, meta = null) => {
  return sendResponse(res, statusCode, true, message, data, meta);
};

const createdResponse = (res, message, data = null) => {
  return sendResponse(res, 201, true, message, data);
};

module.exports = {
  sendResponse,
  successResponse,
  createdResponse,
};
