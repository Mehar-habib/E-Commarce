import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/responsiveHandler";
import crypto from "crypto";
import { sendVerificationToEmail } from "../config/emailConfig";

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
