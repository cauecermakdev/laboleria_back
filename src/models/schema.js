import joi from "joi";

export const cakesSchema = joi.object({
  name: joi.string().min(2).required(),
  price: joi.number().integer().required().min(0),
  description: joi.string().allow("", null),
  image: joi.string().uri().required(),
});

export const clientsSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .required(),
});

export const ordersSchema = joi.object({
  clientId: joi.number().required(),
  cakeId: joi.number().required(),
  quantity: joi.number().min(1).required(),
  totalPrice: joi.number().min(0).required(),
});
