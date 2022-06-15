import { NextFunction, Request, Response } from 'express';
import { UserAlreadyExistsError } from '../../../core/domain/errors/user-already-exists-error';
import { UserNotFoundError } from '../../../core/domain/errors/user-not-found-error';

export const UserErrorHandler =
  () =>
  (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    switch (err.constructor) {
      case UserAlreadyExistsError:
        return res.status(409).send(err.message);
      case UserNotFoundError:
        return res.status(404).send(err.message);
      default:
        return res.status(500).send('Internal Error');
    }
  };
