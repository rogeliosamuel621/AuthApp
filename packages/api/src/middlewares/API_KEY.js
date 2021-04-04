const { API_KEY } = require('../config');
const { Router } = require('express');
const API_KEY_Middleware = Router();

API_KEY_Middleware.use((req, res, next) => {
  const { api_key } = req.headers;

  if (!api_key || api_key !== API_KEY) {
    return res.status(401).json({
      statusCode: 401,
      message: 'NO API_KEY PROVIDED',
    });
  }

  if (api_key === API_KEY) {
    next();
  }
});

module.exports = API_KEY_Middleware;
