class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (statusCode, message) => {
  return new CustomError(message, statusCode);
};

module.exports = { errorHandler };
