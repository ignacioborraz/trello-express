function errorHandler(error, req, res, next) {
  console.log(error);
  return res.status(error.status || 500).json({
    message: error.message.toUpperCase() || "API ERROR",
  });
}

export default errorHandler;
