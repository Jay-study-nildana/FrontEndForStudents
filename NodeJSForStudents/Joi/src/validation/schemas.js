/**
 * Joi schemas for users endpoints
 *
 * - createUserSchema: required name + email, optional active
 * - updateUserSchema: allows partial updates (at least one property required)
 * - idParamSchema: validates route :id param as integer
 */

const Joi = require('joi');

const nameSchema = Joi.string().min(1).max(200).trim();
const emailSchema = Joi.string().email().lowercase().trim();

const createUserSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  active: Joi.boolean().optional()
});

const updateUserSchema = Joi.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  active: Joi.boolean().optional()
}).min(1); // require at least one key for update

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  idParamSchema
};