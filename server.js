import { connect } from "mongoose";
import app from "./app/app";
//import processRunning from "./app/process";
// import { redis } from "./app/config";
// import _redis from "./app/utils/redis";
// import logger from "./app/utils/logger";

require("dotenv").config();

// connect(process.env.MONGO_URL, {
//   // useNewUrlParser: true,
//   // useCreateIndex: true,
//   // useUnifiedTopology: true,
//   // useFindAndModify: false,
//   autoIndex: false
// })
//   .then(() => {
//     console.log("MongoDB Connected ...");
//     // processRunning.init();
//   })
//   .catch((err) => console.log(err));

// _redis.initRedis().then(()=> {
//   logger.info("REDIS CONNECTED");
// });

// redis.initRedis().then(()=> {
//   logger.info("REDIS CONNECTED");
// });

// redis.initSubscriber().catch((error) => {
//   logger.trace("REDIS", JSON.stringify(error), error);
//   process.exit();
// });

const port = process.env.PORT || 5000;

const server = app;
if (process.env.NODE_ENV === "production") {
  // const httpsOptions = {
  //   key: readFileSync(
  //     "/etc/letsencrypt/live/api.credential.asia/privkey.pem",
  //     "utf8"
  //   ),
  //   cert: readFileSync(
  //     "/etc/letsencrypt/live/api.credential.asia/cert.pem",
  //     "utf8"
  //   ),
  //   ca: readFileSync(
  //     "/etc/letsencrypt/live/api.credential.asia/chain.pem",
  //     "utf8"
  //   ),
  // };
  // server = createServer(httpsOptions, app);
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
server.on("error", (error) => {
  console.log("Error: ", error);
});
