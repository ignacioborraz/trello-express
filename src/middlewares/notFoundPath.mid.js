function notFoundPath(req, res, next) {
  return res.status(404).json({
    message: "NOT FOUND PATH",
  });
}
export default notFoundPath;
