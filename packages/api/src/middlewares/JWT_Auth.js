const { Router } = require('express');
const jwt = require('jsonwebtoken');
const JWT_Auth = Router();

const { MODE, JWT_SECRET } = require('../config');
const User = require('../db/models/users.models');

JWT_Auth.use((req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: 'NO TOKEN PROVIDED',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = User.findById(decoded.ID, '_id');

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'UNAUTHORIZED',
      });
    }

    req.user = decoded;
    return next();
  } catch (err) {
    MODE === 'dev' ? console.log(err) : null;

    return res.status(500).json({
      statusCode: 500,
      message: 'INTERNAL SERVER ERROR',
    });
  }
});

module.exports = JWT_Auth;
