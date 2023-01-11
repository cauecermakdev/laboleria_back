import joi from "joi";

export const cakesSchema = joi.object({
  name: joi.string().min(2).required(),
  price: joi.number().integer().required().min(0),
  description: joi.string().min(6).required(),
  image: joi.string().uri().required(),
});

export const clientsSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  phone: joi.number().integer().max(11).min(10).required(),
});

export const ordersSchema = joi.object({
  clientId: joi.number().integer().required(),
  cakeId: joi.number().integer().required(),
  quantity: joi.number().integer().min(1).required(),
  totalPrice: joi.number().integer().min(0).required(),
});
