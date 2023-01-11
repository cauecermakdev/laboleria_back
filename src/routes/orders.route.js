import { Router } from "express";
import {postOrderController, getIdOrderController,getOrderController} from "../controllers/orders.controllers.js";
import { schemaValidation } from "../middlewares/schemasValidation.middlewares.js";
import { ordersSchema } from "../models/schema.js";

const ordersRouter = Router();

ordersRouter.post("/order",schemaValidation(ordersSchema), postOrderController);
ordersRouter.get("/orders",getOrderController);
ordersRouter.get("/:id/orders",getIdOrderController);

export default ordersRouter;