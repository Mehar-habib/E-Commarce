import jwt from "jsonwebtoken";
import { IUSER } from "../models/User";
// This function generates a JWT token using the user's ID
export const generateToken = (user: IUSER): string => {
  return jwt.sign(
    { userId: user?._id }, // Payload contains user ID
    process.env.JWT_SECRET!, // Secret key from env
    { expiresIn: "1d" } // Token expires in 1 day
  );
};
