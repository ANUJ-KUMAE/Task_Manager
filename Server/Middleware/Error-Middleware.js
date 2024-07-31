const errorMiddleware = async (err, req, resp, next) => {
  const status = err.status || 550;
  const message = err.message || "BACKEND ERROR";
  const extraDetails = err.extraDetails || "Error From Backend";

  return resp.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
