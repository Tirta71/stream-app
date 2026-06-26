class ApiError extends Error {
  constructor(statusCode, message, details = null, code = null) {
    super(message);
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default ApiError;
