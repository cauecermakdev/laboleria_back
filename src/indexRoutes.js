import { Router } from "express";
import cakesRouter from "./routes/cakes.route.js";
import clientsRouter from "./routes/clients.route.js";
import ordersRouter from "./routes/orders.route.js";

console.log("entra indexRoutes");


const route = Router();
route.use(cakesRouter);
route.use(clientsRouter);
route.use(ordersRouter)

export default route;
