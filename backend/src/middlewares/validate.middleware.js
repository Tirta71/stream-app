import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body ?? {},
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    throw new ApiError(
      422,
      "Validasi gagal",
      result.error.flatten(),
      "VALIDATION_ERROR",
    );
  }

  req.validated = result.data;
  next();
};

export default validate;
