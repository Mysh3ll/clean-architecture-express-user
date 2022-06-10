import { Server } from 'http';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { Logger } from '../../core/domain/logger';

export interface RestApiConfig {
  log?: boolean;
  loggingMiddleware?: boolean;
  port?: number;
}

export interface RestApiProps {
  logger: Logger;
  config: RestApiConfig;
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
  }

  listen(): Server {
    const port = this.props.config.port ?? 8080;

    return this.app.listen(port, () => {
      if (this.props.config.log ?? true) {
        console.info(`Server started at http://localhost:${port}`);
      }
    });
  }
}
