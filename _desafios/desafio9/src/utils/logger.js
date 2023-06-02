const winston = require('winston');

const ENVIROMENT = process.env.NODE_ENV

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bgRed',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    debug: 'white'
  }
}

let logger

if (ENVIROMENT === 'production') {
  // winston.addColors(customLevelsOptions.colors)
  logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        )
      }),
      new winston.transports.File({ filename: 'logs/errors.log', level: 'error', format: winston.format.simple() })
    ]
  })
} else {
  logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        )
      }),
      new winston.transports.File({ filename: 'logs/errors.log', level: 'error', format: winston.format.simple() })
    ]
  })
}


const addLogger = (req, res, next) => {
  try {
    req.logger = logger;
    req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.error(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.warning(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error(error);
  }

  next();
}

module.exports = {
  addLogger
}