import { Router } from "express";
import * as wishListController from "../controller/wishListController";
import { authenticatedUser } from "../middleware/authMiddleware";

const router = Router();
router.post("/add", authenticatedUser, wishListController.addToWishList);
router.get("/:userId", authenticatedUser, wishListController.getWishListByUser);
router.delete(
  "/remove/:productId",
  authenticatedUser,
  wishListController.removeFromWishList
);

export default router;
