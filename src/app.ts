import { ConsoleLogger } from './secondary-driven-adapters/services/console-logger';
import RestApi from './primary-driving-adapters/api/rest';
import { InMemoryUserRepository } from './secondary-driven-adapters/persistence/in-memory/in-memory-user-repository';
import { GetUserUseCase } from './core/use-cases/get-user-use-case';
import { UuidGenerator } from './secondary-driven-adapters/services/uuid-generator';
import { AddUserUseCase } from './core/use-cases/add-user-use-case';
import { UpdateUserUseCase } from './core/use-cases/update-user-use-case';
import { DeleteUserUseCase } from './core/use-cases/delete-user-use-case';
import { GetUserByIdUseCase } from './core/use-cases/get-user-by-id-use-case';

// Read config
const enableLog = process.env.ENABLE_LOGS
  ? Boolean(process.env.ENABLE_LOGS)
  : undefined;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;

// Create Providers
const logger = new ConsoleLogger();
const userRepository = new InMemoryUserRepository(logger);
const uuidGenerator = new UuidGenerator();
// const gospelRepository = new DynamoDbGospelRepository(logger, dynamoDbClient);

// Usecases
const getUserUseCase = new GetUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const addUserUseCase = new AddUserUseCase(userRepository, uuidGenerator);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Create Apis
const restApi = new RestApi({
  logger,
  config: { log: enableLog, loggingMiddleware: enableLog, port },
  getUserUseCase,
  getUserByIdUseCase,
  addUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
});

// Run backend
restApi.listen();
