const defaultErrorCodes = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "VALIDATION_ERROR",
  500: "INTERNAL_SERVER_ERROR",
};

const getStatusCode = (error) => {
  if (error.name === "MulterError") {
    return 422;
  }

  const statusCode = Number(error.statusCode);

  if (Number.isInteger(statusCode) && statusCode >= 400 && statusCode <= 599) {
    return statusCode;
  }

  return 500;
};

const getErrorCode = (error, statusCode) =>
  error.name === "MulterError"
    ? "UPLOAD_VALIDATION_ERROR"
    : error.code || defaultErrorCodes[statusCode] || "INTERNAL_SERVER_ERROR";

const getErrorMessage = (error, statusCode) => {
  if (error.name === "MulterError" && error.code === "LIMIT_FILE_SIZE") {
    return "Ukuran foto maksimal 2MB";
  }

  if (statusCode === 500 && !error.isOperational) {
    return "Internal server error";
  }

  return error.message || "Internal server error";
};

const errorMiddleware = (error, _req, res, _next) => {
  const statusCode = getStatusCode(error);

  res.status(statusCode).json({
    code: getErrorCode(error, statusCode),
    details: error.details ?? null,
    message: getErrorMessage(error, statusCode),
    success: false,
  });
};

export default errorMiddleware;
