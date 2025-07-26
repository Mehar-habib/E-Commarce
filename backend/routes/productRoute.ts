import { Router } from "express";
import * as productController from "../controller/productController";
import { authenticatedUser } from "../middleware/authMiddleware";
import { multerMiddleware } from "../config/cloudnaryConfig";

const router = Router();
router.post(
  "/",
  authenticatedUser,
  multerMiddleware,
  productController.createProduct
);

export default router;
