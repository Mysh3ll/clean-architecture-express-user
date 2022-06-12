import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const expressValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<unknown> | void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsInfos = errors.array();

    return res
      .status(400)
      .json({ message: 'Invalid body parameters', errors: errorsInfos });
  }

  return next();
};

export default expressValidation;
