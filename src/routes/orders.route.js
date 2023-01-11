import { Router } from "express";
import {postOrderController, getIdOrderController,getOrderController} from "../controllers/orders.controllers.js";
import { schemaValidation } from "../middlewares/schemasValidation.middlewares.js";
import { ordersSchema } from "../models/schema.js";

const ordersRouter = Router();

ordersRouter.post("/order",schemaValidation(ordersSchema), postOrderController);
ordersRouter.get("/orders",getOrderController);
ordersRouter.get("/orders/:id",getIdOrderController);

export default ordersRouter;