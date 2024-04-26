const handleValidationError = (message) => {
  const validationError = new Error(message);
  validationError.status = 400;
  throw validationError;
};

const handleNotFoundError = (message) => {
  const notFoundError = new Error(message);
  notFoundError.status = 404;
  throw notFoundError;
};

module.exports = { handleNotFoundError, handleValidationError };
