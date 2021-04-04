const API_KEY_Middleware = require('./API_KEY');
const JWT_Auth = require('./JWT_Auth');
const notFound = require('./notFound');
const { ErrorHandler, handlerErrors } = require('./ErrorHandler');

module.exports = {
  API_KEY_Middleware,
  JWT_Auth,
  notFound,
  ErrorHandler,
  handlerErrors,
};
