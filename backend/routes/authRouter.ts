import { Router } from "express";
import * as authController from "../controller/authController";
import { authenticatedUser } from "../middleware/authMiddleware";

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/logout", authController.logout);

router.get("/verify-auth", authenticatedUser, authController.checkUserAuth);

export default router;
