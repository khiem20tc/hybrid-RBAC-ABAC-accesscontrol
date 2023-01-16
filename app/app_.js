import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import mountRoutes from "./route";

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  logger("combined", {
    stream: {
      write: function (message) {
        console.log(message);
      },
    },
  })
);

app.use((req, res, next) => {
  req.headers.origin = req.headers["referer"];
  next();
});

app.use((req, res, next) => {
  if (!req.headers.origin) {
    req.headers.origin = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  }
  next();
});

app.use(helmet());

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  next();
});
app.use(compression());
app.use(json({ limit: "20mb" }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/favicon.ico", (req, res) => res.status(204));

// app.use(function (req, res, next) {
//   if (!req.headers.apikey || req.headers.apikey != "EBSebs2020@)@)") {
//     return res.status(401).json("APIKey is not valid");
//   }
//   next();
// });

mountRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.message === "Not Found") {
    return res.status(404).json("Path not found");
  }

  // log error
  const errToLog = err.realError ? err.realError : err;
  const errToReturn = err.realError ? err.userError : err;

  console.log("ERROR:", errToLog);
  console.log(
    `${errToLog.message}
    STACK: ${errToLog.stack}
    Header: ${JSON.stringify(req.headers)}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
    Return to user: ${JSON.stringify(errToReturn)}`
  );

  let status = 500;
  if (errToReturn.code) {
    status = errToReturn.code / 100;
  }
  return res.status(status).json({
    error: errToReturn,
  });
});

export default app;