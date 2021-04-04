function notFound(req, res) {
  return res.status(404).json({
    statusCode: 404,
    message: 'Not Found',
    path: req.url,
  });
}

module.exports = notFound;
