import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import multer from "multer";

import mountRoutes from "./route";
import { winston } from "./config";
import { apiError } from "./helper";

const { not_found } = apiError;
const upload = multer();

const app = express();

app.use(
  logger("combined", {
    stream: {
      write: function(message) {
        winston.info(message);
      },
    },
  })
);

app.use(helmet());
app.use(cors());
app.use(compression({
  threshold: 100 * 1024
}));
app.use(json({ limit: "20mb" }));
app.use(urlencoded({ limit: "20mb", extended: false }));
app.use(upload.any());
app.use(cookieParser());
app.disable("x-powered-by");

app.get("/favicon.ico", (_req, res) => res.status(204));
mountRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
  if (err.message === "Not Found") {
    return res.status(404).json(not_found.withDetails("Path not found."));
  }

  // log error
  const errToLog = err.realError ? err.realError : err;
  const errToReturn = err.realError ? err.userError : err;

  console.error("ERROR:", errToLog);
  winston.error(
    `${errToLog.message}
    STACK: ${errToLog.stack}
    Header: ${JSON.stringify(req.headers)}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
    Return to user: ${JSON.stringify(errToReturn)}`
  );

  const status = Math.floor(errToReturn.code / 100);
  return res.status(status).json({
    error: errToReturn,
  });
});

export default app;
