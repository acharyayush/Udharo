const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Send an appropriate error response
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
export default errorHandler