import { Server } from 'http';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { Logger } from '../../core/domain/services/logger';
import { GetUserUseCaseInterface } from '../../core/use-cases/user/get-user-use-case';
import { userRouter } from './routes/user-route';
import { AddUserUseCaseInterface } from '../../core/use-cases/user/add-user-use-case';
import { errorHandler } from './middlewares/error-handler';
import { UpdateUserUseCaseInterface } from '../../core/use-cases/user/update-user-use-case';
import { DeleteUserUseCaseInterface } from '../../core/use-cases/user/delete-user-use-case';
import { UserErrorHandler } from './middlewares/user-error-handler';
import { GetUserByIdUseCaseInterface } from '../../core/use-cases/user/get-user-by-id-use-case';

export interface RestApiConfig {
  log?: boolean;
  loggingMiddleware?: boolean;
  port?: number;
}

export interface RestApiProps {
  logger: Logger;
  config: RestApiConfig;
  getUserUseCase: GetUserUseCaseInterface;
  getUserByIdUseCase: GetUserByIdUseCaseInterface;
  addUserUseCase: AddUserUseCaseInterface;
  updateUserUseCase: UpdateUserUseCaseInterface;
  deleteUserUseCase: DeleteUserUseCaseInterface;
}

export default class RestApi {
  public app: express.Express;

  constructor(private readonly props: RestApiProps) {
    // Create the server and add middlewares
    this.app = express();
    this.app.use(
      urlencoded({
        extended: true,
      })
    );
    this.app.use(json({ limit: '50mb' }));
    if (props.config.loggingMiddleware ?? true) {
      this.app.use(morgan('combined'));
    }

    // server's health check
    this.app.get('/', (_req, res) => {
      res.send({
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      });
    });

    // API routes
    this.app.use(
      '/api/users',
      userRouter(
        props.getUserUseCase,
        props.getUserByIdUseCase,
        props.addUserUseCase,
        props.updateUserUseCase,
        props.deleteUserUseCase
      ),
      UserErrorHandler()
    );

    this.app.use(errorHandler(props.logger));
  }

  listen(): Server {
    const port = this.props.config.port ?? 8080;

    return this.app.listen(port, () => {
      if (this.props.config.log ?? true) {
        this.props.logger.info(`Server started at http://localhost:${port}`);
      }
    });
  }
}
