import express from "express";
import CategoryController from "../controllers/category.controller";
import { postRoutes } from "./postRoutes";
import { categoryRoutes } from "./categoryRoutes";
import { tagRoutes } from "./tagRoutes";

const router = express.Router();

postRoutes(router);

categoryRoutes(router);

tagRoutes(router);

export default router;
