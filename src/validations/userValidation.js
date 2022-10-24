import Joi from "joi";

export const registerValidation = new Joi.object({
  firstName: Joi.string().min(4).trim().required(),
  lastName: Joi.string().min(4).trim().required(),
  phone: Joi.string().length(10).trim(),
  email: Joi.string().trim().email().min(4).required(),
  seatNo: Joi.number().required(),
});

export const loginValidation = new Joi.object({
  email: Joi.string().trim().email().min(4).required(),
  password: Joi.string().min(6).trim().required(),
});
