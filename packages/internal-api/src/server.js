import express from "express";
import stoppable from "stoppable";

import apolloServerExpress from "apollo-server-express";
import moment from "moment";

import winston from "winston";
import { v4 } from "uuid";

import http from "http";

import schema from "./schema.js";

const loggerLevels = {};
const loggerColors = {};

winston.addColors({
  ...winston.config.npm.colors,
  ...loggerColors,
  all: "green",
});

const logger = winston.createLogger({
  levels: {
    ...winston.config.npm.levels,
    ...loggerLevels,
    all: 100,
  },
  level: "all",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json(),
    process.env.NODE_ENV !== "production"
      ? winston.format.colorize()
      : winston.format.prettyPrint(),
    winston.format.printf(
      info =>
        `${info.timestamp} ${info.level}: ${info.message}${
          info.stack ? `\n${info.stack}` : ""
        }`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

const { ApolloServer } = apolloServerExpress;

process.send = process.send || function noop() {};

if (!process.env.NODE_CONFIG_DIR) {
  logger.error("'Configuration variable is missing (NODE_CONFIG_DIR)");
  process.exit(1);
}

logger.info(`NODE_CONFIG_DIR=${process.env.NODE_CONFIG_DIR}`);
logger.info(`NODE_ENV=${process.env.NODE_ENV}`);

/**
 * Express app
 */
const app = express();

app.use((req, res, next) => {
  const requestId = v4();

  logger.format = winston.format.combine(
    logger.format,
    winston.format.printf(
      info =>
        `${info.timestamp} [${requestId}] ${info.level}: ${info.message}${
          info.stack ? `\n${info.stack}` : ""
        }`,
    ),
  );

  logger.debug("starting request");
  res.locals.requestLogger = logger;
  res.locals.requestId = requestId;
  res.locals.currentDateTime = moment().utc();
  next();
});

const getContext = ({ req, res }) => ({
  requestId: res.locals.requestId,
  requestLogger: res.locals.requestLogger,
  viewer: res.locals.user,
  session: res.locals.session,
  device: req.header("user-agent"),
  currentDateTime: res.locals.currentDateTime,
  sequelize: res.locals.sequelize,
  amqpConnection: res.locals.amqpConnection,
  client: res.locals.client,
  firebirdConfig: res.locals.firebirdConfig,
  isWebClientRequest: res.locals.isWebClientRequest,
});

const apolloServer = new ApolloServer({
  schema,
  context: getContext,
  introspection: true,
  playground: {
    tabs: [
      {
        name: "currency",
        endpoint: "",

        query: `# In order to access the full API documentation you need to authenticate first

query currencies {
  currencies {
    id
    name

  }
}

`,
      },
    ],
  },
});

apolloServer.applyMiddleware({
  app,
  path: "/",
});

// terminate all connections after 7 seconds
const server = stoppable(http.createServer(app), 500);

const { port } = { port: 3090 };
server.listen(port, () => {
  // eslint-disable-next-line
  const { address, port } = server.address();
  logger.info(`GraphQL Server running on http://${address}:${port}`);
  process.send("ready");
});

// graceful shutdown
process.on("SIGINT", () => {
  logger.info("SIGINT signal received");

  // Stops the server from accepting new connections and finishes existing connections.
  server.stop(err => {
    if (err) {
      logger.error("server stop error", { message: err });
      process.exit(1);
    }
    logger.info("server stopped");
    process.exit();
  });
});
