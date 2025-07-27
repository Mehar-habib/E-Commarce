import { Router } from "express";
import * as cartController from "../controller/cartController";
import { authenticatedUser } from "../middleware/authMiddleware";

const router = Router();
router.post("/add", authenticatedUser, cartController.addCart);
router.get("/:userId", authenticatedUser, cartController.getCartByUser);
router.delete(
  "/remove/:productId",
  authenticatedUser,
  cartController.removeFromCart
);

export default router;
