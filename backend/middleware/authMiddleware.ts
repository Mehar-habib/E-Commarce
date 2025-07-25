// Import required types and modules from Express and JWT
import { NextFunction, Request, Response } from "express";
import { response } from "../utils/responsiveHandler"; // Custom response utility
import jwt from "jsonwebtoken";

// Extend the Express Request type globally to include 'id' for authenticated user
declare global {
  namespace Express {
    interface Request {
      id?: string; // Used to store authenticated user's ID from JWT
    }
  }
}

// Middleware function to authenticate user from JWT token in cookies
const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from cookies
  const token = req.cookies.access_token;

  // If no token found, block the request
  if (!token) {
    return response(res, 401, "User not authenticated, or token not found");
  }

  try {
    // Verify the token using secret key and cast it to JwtPayload
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    // If token is invalid or decoding fails
    if (!decode) {
      return response(res, 401, "User not authenticated, or user not found");
    }

    // Set decoded user ID into req.id for use in next middleware or controller, Without the declaration, TypeScript throws error
    req.id = decode.userId;

    // Continue to next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return response(res, 401, "Not authorized, token not valid or expired");
  }
};

export { authenticatedUser };
