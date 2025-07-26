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
router.get("/", authenticatedUser, productController.getAllProducts);
router.get("/:id", authenticatedUser, productController.getProductById);
router.delete(
  "/seller/:productId",
  authenticatedUser,
  productController.deleteProduct
);
router.get(
  "/seller/:sellerId",
  authenticatedUser,
  productController.getProductBySellerId
);

export default router;
