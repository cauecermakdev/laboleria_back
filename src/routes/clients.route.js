import { Router } from "express";
import { postClientsController } from "../controllers/clients.controllers.js";
import { getClientOrdersController } from "../controllers/clients.controllers.js";
import { schemaValidation } from "../middlewares/schemasValidation.middlewares.js";
import { ordersSchema } from "../models/schema.js";
import { clientsSchema } from "../models/schema.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  schemaValidation(clientsSchema),
  postClientsController
);
clientsRouter.get(
  "/clients/:id/orders",
  schemaValidation(ordersSchema),
  getClientOrdersController
);

export default clientsRouter;
