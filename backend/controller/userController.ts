import { Request, Response } from "express";
import { response } from "../utils/responsiveHandler";
import User from "../models/User";

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return response(res, 401, "user not found, please provide a valid id");
    }
    const { name, email, phoneNumber } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phoneNumber },
      { new: true, runValidators: true }
    ).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpire"
    );

    if (!updateUser) {
      return response(res, 404, "User not found");
    }
    return response(res, 200, "User profile updated successfully", updateUser);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};
