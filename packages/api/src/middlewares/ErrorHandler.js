const { MODE } = require('../config');

class ErrorHandler extends Error {
  constructor(statusCode, messages, err) {
    super();
    this.statusCode = statusCode;
    this.message = messages;
    this.error = err;
  }

  logError(error) {
    console.log(error);
  }
}

function handlerErrors(err, req, res, next) {
  const { statusCode, message, error } = err;

  if (MODE === 'dev') err.logError(error);

  return res.status(statusCode).json({
    statusCode,
    message,
  });
}

module.exports = {
  ErrorHandler,
  handlerErrors,
};
