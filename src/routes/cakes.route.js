import { Router } from "express";
import { postCakes } from "../controllers/cakes.controllers.js";
import { schemaValidation } from "../middlewares/schemasValidation.middlewares.js";
import { cakesSchema } from "../models/schema.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", schemaValidation(cakesSchema), postCakes);

export default cakesRouter;
