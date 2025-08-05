import { NextFunction, Request, Response, Router } from "express";
import * as authController from "../controller/authController";
import { authenticatedUser } from "../middleware/authMiddleware";
import passport from "passport";
import { IUSER } from "../models/User";
import { generateToken } from "../utils/generateToken";

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/logout", authController.logout);

router.get("/verify-auth", authenticatedUser, authController.checkUserAuth);

// Step 1: Redirect user to Google login screen
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Request access to user profile and email
  })
);

// Step 2: Google redirects to /google/callback after login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}`, // Redirect if login fails
    session: false, // Disable session-based login
  }),

  // Step 3: Handle successful login
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as IUSER; // Authenticated user from Passport

      // Generate access token (e.g., JWT)
      const accessToken = await generateToken(user);

      // Store token in HTTP-only cookie for security
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      // Redirect user to frontend app (logged in)
      res.redirect(`${process.env.FRONTEND_URL}`);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
