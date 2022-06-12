import { Logger } from '../../../core/domain/services/logger';
import { Request, Response, NextFunction } from 'express';

export const errorHandler =
  (logger: Logger) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: unknown, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    res.status(500).send('Internal Error');
  };
