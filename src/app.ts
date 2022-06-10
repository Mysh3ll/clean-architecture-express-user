import { ConsoleLogger } from './secondary-driven-adapters/console-logger';
import RestApi from './primary-driving-adapters/api/rest';

(async () => {
  // Read config

  const enableLog = process.env.ENABLE_LOGS
    ? Boolean(process.env.ENABLE_LOGS)
    : undefined;
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;

  // Create Providers
  const logger = new ConsoleLogger();

  // Usecases

  // Create Apis
  const restApi = new RestApi({
    logger,
    config: { log: enableLog, loggingMiddleware: enableLog, port },
  });

  // Run backend
  restApi.listen();
})();
