import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/responsiveHandler";
import crypto from "crypto";
import {
  sendResetPasswordLinkToEmail,
  sendVerificationToEmail,
} from "../config/emailConfig";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, agreeTerms } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, "User already exists");
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({
      name,
      email,
      password,
      verificationToken,
      agreeTerms,
    });
    await user.save();

    const result = await sendVerificationToEmail(user.email, verificationToken);
    console.log(result);
    return response(
      res,
      200,
      "User created successfully, Please check your email box to verify your account"
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    // Get token from URL parameters (should be req.params.token)
    const token = req.params;

    // Find the user with this verification token
    const user = await User.findOne({ verificationToken: token });

    // If no user found, token is invalid or expired
    if (!user) {
      return response(res, 400, "Invalid or expired token");
    }

    // Mark user as verified
    user.isVerified = true;

    // Remove token after verification
    user.verificationToken = undefined;

    // Generate JWT token for the verified user
    const accessToken = generateToken(user);

    // Set JWT token in httpOnly cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true, // Cannot be accessed by JS in the browser (for security)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Save updated user to database
    await user.save();

    return response(res, 200, "Email verified successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password is incorrect
    if (!user || !(await user.comparePassword(password))) {
      return response(res, 400, "Invalid email or password");
    }

    // Check if email is verified
    if (!user.isVerified) {
      return response(
        res,
        400,
        "Please verify your email before logging in. Check your inbox to verify your account"
      );
    }

    // Generate JWT token after successful login
    const accessToken = generateToken(user);

    // Set token in a secure httpOnly cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Respond with success and basic user info
    return response(res, 200, "Login successful", {
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response(res, 400, "No user found with this email");
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = new Date(Date.now() + 3600);

    await user.save();
    await sendResetPasswordLinkToEmail(user.email, resetPasswordToken);

    return response(res, 200, "Reset password link sent to your email");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return response(res, 400, "Invalid or expired token");
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return response(res, 200, "Password reset successful");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
    });
    return response(res, 200, "Logout successful");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};
