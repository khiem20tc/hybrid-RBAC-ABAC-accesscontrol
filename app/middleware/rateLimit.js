import rateLimit from "express-rate-limit";
import ERRORCODE from "../constant/errorCode";

const TIMELIMIT_REQUEST = 5 * 60 * 1000;
const MAX_REQUESTS = 1000;

const limitAuthen = rateLimit({
  windowMs: TIMELIMIT_REQUEST || 60000,
  max: MAX_REQUESTS ? Math.floor(MAX_REQUESTS / 10) : 35,
  // allows to create custom keys (by default user IP is used)
  keyGenerator: function (req /*, res */) {
    return req.headers.authorization || req.ip;
  },
  handler: (req, res) => {
    res.status(429).send(ERRORCODE.MANY_REQUEST);
  },
});

const apiLimiter = rateLimit({
  windowMs: TIMELIMIT_REQUEST || 300000,
  max: MAX_REQUESTS || 1000,
  // allows to create custom keys (by default user IP is used)
  keyGenerator: function (req /*, res */) {
    return req.headers.authorization || req.ip;
  },
  handler: (req, res) => {
    res.status(429).send(ERRORCODE.MANY_REQUEST);
  },
});

export default {
  limitAuthen,
  apiLimiter,
};
