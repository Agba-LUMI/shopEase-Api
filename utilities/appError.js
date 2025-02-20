class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4");
    this.operational = true;

    Error.captureStackTrace(this, this.contructor);
  }
}
module.exports = AppError;
