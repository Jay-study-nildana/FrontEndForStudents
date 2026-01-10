/**
 * DTO validation middleware using class-validator + class-transformer
 *
 * - Accepts a class constructor (DTO)
 * - Transforms plain object to class instance
 * - Validates with class-validator
 * - On success, replaces req.body with the instance (optionally)
 *
 * This middleware validates only req.body; you can adapt it for params/query.
 */

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';

/**
 * validateDto creates an Express middleware that:
 * - Converts req.body to the DTO class instance
 * - Runs validation and returns 400 with details if invalid
 */
export function validateDto(dtoClass: any): RequestHandler {
  return async (req, res, next) => {
    // Transform plain object to class instance (applies @Transform decorators)
    const dtoObject = plainToInstance(dtoClass, req.body);

    // Validate - whitelist and forbidUnknown fields are handled by DTO decorators / options
    const errors = await validate(dtoObject as object, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    if (errors.length > 0) {
      // Flatten errors into readable messages
      const details = errors.flatMap((e) =>
        Object.values(e.constraints || {}).map((msg) => ({
          property: e.property,
          message: msg
        }))
      );
      return res.status(400).json({ error: 'Validation failed', details });
    }

    // Replace body with the class instance (useful downstream)
    req.body = dtoObject;
    next();
  };
}