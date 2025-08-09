import { Router } from "express";
import * as userController from "../controller/userController";
import { authenticatedUser } from "../middleware/authMiddleware";

const router = Router();
router.put(
  "/profile/update/:userId",
  authenticatedUser,
  userController.updateUserProfile
);

export default router;
