import Joi from "joi";

const seatValidation = new Joi.object({
  seatNo: Joi.number().required(),
  status: Joi.number().required(),
  userid: Joi.any(),
});

export default seatValidation;
