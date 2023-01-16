import errors from "../helper/apiError";

export default (Schema, isBody) => async (req, res, next) => {
  const data = isBody ? req.body : req.query;
  try {
    await Schema.validateAsync(data);
    next();
  } catch (error) {
    return next(errors.invalid_input.withDetails(error.message));
  }
};
