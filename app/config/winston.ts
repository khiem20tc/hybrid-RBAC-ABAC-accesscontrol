import appRoot from "app-root-path";
import {
  createLogger,
  transports as _transports,
  format as _format,
} from "winston";

const options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

const logger = createLogger({
  transports: [
    new _transports.File(options.file),
    new _transports.Console(options.console),
  ],
  exitOnError: false,
  format: _format.combine(
    _format.label({
      label: "default",
    }),
    _format.timestamp(),
    _format.printf((info) => {
      return `${info.timestamp} - ${
        info.label
      } [${info.level.toLocaleUpperCase()}] - ${info.message}`;
    })
  ),
});

export default logger;
