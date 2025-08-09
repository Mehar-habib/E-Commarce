import { Request, Response } from "express";
import { response } from "../utils/responsiveHandler";
import Address from "../models/Address";
import User from "../models/User";

/**
 * Create or update a user's address
 *
 * - If `addressId` is provided → Update existing address
 * - If `addressId` is NOT provided → Create new address and link it to the user
 */
export const createOrUpdateAddressByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.id; // Extract user ID from request (assumed to be set by authentication middleware)
    const {
      addressLine1,
      addressLine2,
      phoneNumber,
      city,
      state,
      pincode,
      addressId,
    } = req.body; // Extract address fields from request body

    // Validate if user is logged in
    if (!userId) {
      return response(res, 401, "user not found, please provide a valid id");
    }

    // Validate required fields for address creation
    if (!addressLine1 || !phoneNumber || !city || !state || !pincode) {
      return response(
        res,
        400,
        "Please provide all the required fields to create a new address"
      );
    }

    // If `addressId` is provided → UPDATE existing address
    if (addressId) {
      const existingAddress = await Address.findById(addressId);
      if (!existingAddress) {
        return response(res, 404, "Address not found");
      }

      // Update existing address fields
      existingAddress.addressLine1 = addressLine1;
      existingAddress.addressLine2 = addressLine2;
      existingAddress.phoneNumber = phoneNumber;
      existingAddress.city = city;
      existingAddress.state = state;
      existingAddress.pincode = pincode;

      await existingAddress.save(); // Save updated address
      return response(
        res,
        200,
        "Address updated successfully",
        existingAddress
      );
    }

    // If `addressId` is NOT provided → CREATE new address
    else {
      const newAddress = new Address({
        user: userId,
        addressLine1,
        addressLine2,
        phoneNumber,
        city,
        state,
        pincode,
      });

      await newAddress.save(); // Save new address

      // Link this new address to the user in the User collection
      await User.findByIdAndUpdate(
        userId,
        { $push: { addresses: newAddress._id } }, // Add address ID to user's addresses array
        { new: true }
      );

      return response(res, 200, "Address created successfully", newAddress);
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong"); // Server error
  }
};

/**
 * Get all addresses linked to the logged-in user
 */
export const getAddressByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.id; // Extract user ID from request

    // Validate if user ID exists
    if (!userId) {
      return response(res, 401, "user not found, please provide a valid id");
    }

    // Find user and populate their addresses array with full address documents
    const address = await User.findById(userId).populate("addresses");

    // If no address found for the user
    if (!address) {
      return response(res, 404, "Address not found");
    }

    return response(res, 200, "Address retrieved successfully", address);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong"); // Server error
  }
};
