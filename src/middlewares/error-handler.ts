import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { logger } from '../config/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    logger.warn(err.serializeErrors());
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }
  logger.error(err);
  return res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
