/**
 * Joi validation middleware factory
 * - schema: Joi schema to validate (object)
 * - property: 'body' | 'query' | 'params' (where to validate)
 *
 * The middleware:
 * - Validates using schema.validate()
 * - Uses { abortEarly: false } to collect all errors
 * - Uses { stripUnknown: true } to remove unexpected properties
 * - On success, replaces req[property] with the validated value
 * - On failure, responds with 400 and details
 */

const Joi = require('joi');

function validate(schema, property = 'body') {
  return (req, res, next) => {
    const data = req[property];
    const options = { abortEarly: false, stripUnknown: true };

    const { error, value } = schema.validate(data, options);

    if (error) {
      const details = error.details.map((d) => ({
        path: d.path.join('.'),
        message: d.message
      }));
      return res.status(400).json({ error: 'Validation failed', details });
    }

    // Replace with validated (and sanitized by Joi) value
    req[property] = value;
    next();
  };
}

module.exports = validate;