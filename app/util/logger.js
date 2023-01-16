
// import Log4js from "log4js";
// import fs from "fs";
// Log4js.configure({
//   appenders: {
//     file: { type: "file", filename: "./logs/error.log" },
//     console: { type: "console" }
//   },
//   categories: { default: { appenders: ["console", "file"], level: "info" } }
// });
// const log4js = Log4js.getLogger();
// const error = (tag, ...message) => {
//   log4js.error(`[${tag}]  - ${JSON.stringify(message)} ${message}`);
// };

// const info = (tag, ...message) => {
//   log4js.info(`[${tag}]  - ${JSON.stringify(message)} ${message}`);
// };

// const log = (info) => {
//   try {
//     fs.appendFile("./logs/stamp.log", info, function (err) {
//       if (err) {
//         throw err;
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default {
//   error,
//   info,
//   log
// };

import Log4js from "log4js";
Log4js.configure({
  appenders: {
    log: {
      type: "dateFile", 
      filename: `${global.appRoot}/logs/debug.log`,
      numBackups: 7,
      compress: true,
      keepFileExt: true
    },
    info: {
      type: "dateFile", 
      filename: `${global.appRoot}/logs/app.log`,
      numBackups: 7,
      compress: true,
      keepFileExt: true
    },
    trace: {
      type: "dateFile", 
      filename: `${global.appRoot}/logs/app.log`,
      numBackups: 7,
      compress: true,
      keepFileExt: true
    },
    error: {
      type: "dateFile", 
      filename: `${global.appRoot}/logs/error.log`,
      numBackups: 7,
      compress: true,
      keepFileExt: true
    },
    console: { type: "console", layout: {type: "colored"} }
  },
  categories: { 
    default: { appenders: ["console", "log"], level: "DEBUG" },
    info: { appenders: ["console", "info"], level: "INFO" },
    error: { appenders: ["console", "error"], level: "ERROR" },
    trace: { appenders: ["console", "trace"], level: "TRACE" },
  }
});
const error = (tag, ...message) => {
  Log4js.getLogger("error").error(tag, `[${message}]`);
};

const info = (tag, ...message) => {
  Log4js.getLogger("info").info(tag, `[${message}]`);
};

const debug = (message, ...args) => {
  Log4js.getLogger("default").debug(message, ...args);
};

const trace = (message, ...args) => {
  Log4js.getLogger("trace").trace(message, ...args);
};

export default {
  error,
  info,
  debug,
  trace
};