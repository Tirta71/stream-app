const serializeData = (value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value && typeof value === "object" && typeof value.toNumber === "function") {
    return value.toNumber();
  }

  if (Array.isArray(value)) {
    return value.map(serializeData);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, serializeData(item)]),
    );
  }

  return value;
};

const sendResponse = (
  res,
  {
    code = "SUCCESS",
    data = null,
    message = "Success",
    meta = null,
    statusCode = 200,
  } = {},
) => {
  res.status(statusCode).json({
    code,
    data: serializeData(data),
    message,
    meta: serializeData(meta),
    success: true,
  });
};

export default sendResponse;
