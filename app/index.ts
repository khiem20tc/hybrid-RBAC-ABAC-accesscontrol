import {resolve} from "path";
declare global {
  var appRoot: string;
  const accountPackage: [];
}

global.appRoot = resolve(__dirname, "../");
import { config } from "dotenv";
config({path: ".env"});

import mongoose from "mongoose";
import { Application } from "express";
import app from "./app";
import {logger} from "./util";

const { connect } = mongoose;

connect(process.env.MONGO_URL!, {
  //useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // autoIndex: true,
  // serverSelectionTimeoutMS: 15000,
})
  .then(async() => {
    logger.info("MongoDB Connected");
  })
  .catch((err) => {
    logger.error(err);
  });

mongoose.set("debug", process.env.NODE_ENV !== "production" ? true : false);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
app.on("error", (error: Application) => {
  logger.error("Error: ", error);
});