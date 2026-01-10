/**
 * Central error handler (TypeScript)
 */

import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  const status = err.status || 500;
  const payload: Record<string, any> = { error: err.message || 'Internal Server Error' };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}