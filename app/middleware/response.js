"use strict";

import ERRORCODE from "../constant/errorCode";
import { validationResult } from "express-validator";

const message = (res, data, status) => {
  try {
    if (data && data.errorCode) {
      data = { ...data };
      const defaultStatus = data.errorCode === ERRORCODE.SUCCESSFUL.errorCode ? 200 : 400;
      status = status || data.status || defaultStatus;
      delete data.status;
      return res.status(status).json(data);
    }
    return res.status(500).json(ERRORCODE.ERROR_SERVER);
  } catch (error) {
    console.log("response message status", error);
    return res.status(500).json(ERRORCODE.ERROR_SERVER);
  }
};

const throwBug = (req, res, next) => {
  try {
    const validator = validationResult(req);

    if (validator.errors.length) {
      ERRORCODE.INVALID_PARAMETER.message = validator
        .array()
        .shift();
      throw ERRORCODE.INVALID_PARAMETER;
    }
    next();
  } catch (error) {
    if (error && error.errorCode) {
      return message(res, error);
    }
    return message(res, ERRORCODE.ERROR_SERVER);
  }
};
export default {
  message,
  throwBug
};

export {
  message,
  throwBug
};
