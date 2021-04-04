function successMessage(data, res, message) {
  const Message = message || 'OK';
  return res.status(200).json({
    Message,
    Data: data,
  });
}

module.exports = successMessage;
