const { createLogger, transports, format } = require("winston");

// Extrair local do erro (arquivo:linha)
function getErrorLocation(error) {
  if (!error?.stack) return null;

  const stackLines = error.stack.split("\n");

  if (stackLines.length > 1) {
    const callerLine = stackLines[1].trim();
    const match = callerLine.match(/at\s+(?:.*\()?(.+):(\d+):(\d+)\)?/);
    if (match) return `${match[1]}:${match[2]}`;
  }

  return null;
}

const customFormat = format.printf(({ timestamp, level, message, error }) => {
  const location = error ? getErrorLocation(error) : null;

  const levelColor =
    level === "info" ? "\x1b[32m" : level === "error" ? "\x1b[31m" : "\x1b[35m";

  const reset = "\x1b[0m";

  return `${timestamp} [${levelColor}${level.toUpperCase()}${reset}] ${
    location ? `(${location}) ` : ""
  }${message}${error ? `: ${error.message}` : ""}`;
});

// Ambientes
const isDev = process.env.NODE_ENV !== "production";

const logger = createLogger({
  level: isDev ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: "DD/MM/YYYY HH:mm:ss.SSS" }),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = logger;
