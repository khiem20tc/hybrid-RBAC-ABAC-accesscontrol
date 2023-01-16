import { verify } from "jsonwebtoken";
import Joi from "../constant/joi";
import ApiError from "../helper/apiError";

const { JoiGeneral } = Joi;

const { required_auth, token_expired, invalid_auth } = ApiError;

const authen = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  //   const marketplaceKey = req.header("marketplace-key");
  //   if (marketplaceKey && process.env.BACKEND_APIKEY && marketplaceKey === process.env.BACKEND_APIKEY) {
  //     return next();   
  //   }

  //Check for token
  if (!authHeader) {
    return next(required_auth.withDetails("Authorization header is missing."));
  }

  const authHeaderArray = authHeader.split(" ");

  if (authHeaderArray[0] !== "Bearer" || authHeaderArray.length == 0) {
    return next(required_auth.withDetails("Authorization header is invalid."));
  }

  const token = authHeaderArray[1];

  verify(token, process.env.JWT_AUTH_SERVICE, async (err, payload) => {
    if (err) {
      if (err.message === "jwt expired") {
        return next(token_expired);
      }
      return next(invalid_auth.withDetails(err.message));
    }

    try {
      await JoiGeneral.JWTPayload.validateAsync(payload);
    } catch (error) {
      return next(
        invalid_auth.withDetails(`Invalid token payload: ${error.message}`)
      );
    }

    req.user = payload;
    next();
  });
};

const author = (role) => async(req, res, next) => {

  const authHeader = req.header("Authorization");

  //Check for token
  if (!authHeader) {
    return next(required_auth.withDetails("Authorization header is missing."));
  }

  const authHeaderArray = authHeader.split(" ");

  if (authHeaderArray[0] !== "Bearer" || authHeaderArray.length == 0) {
    return next(required_auth.withDetails("Authorization header is invalid."));
  }

  const token = authHeaderArray[1];

  verify(token, process.env.JWT_AUTH_SERVICE, async (err, payload) => {
    if (err) {
      if (err.message === "jwt expired") {
        return next(token_expired);
      }
      return next(invalid_auth.withDetails(err.message));
    }

    try {
      await JoiGeneral.JWTPayload.validateAsync(payload);
    } catch (error) {
      return next(
        invalid_auth.withDetails(`Invalid token payload: ${error.message}`)
      );
    }

    req.user = payload;

    if (payload.role !== role) {
      return next(invalid_auth.withDetails("Invalid role required:", role));
    }

    next();
  });
};

export default {
  authen,
  author
};