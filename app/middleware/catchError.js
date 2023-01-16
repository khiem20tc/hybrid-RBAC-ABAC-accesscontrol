import { apiError as errors } from "../helper";

export default function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      return next({
        userError: errors.internal_error,
        realError: error,
      });
    }
  };
}
