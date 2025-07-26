import { Request, Response } from "express";
import { response } from "../utils/responsiveHandler";
import { uploadToCloudinary } from "../config/cloudnaryConfig";
import Products from "../models/Products";

// Controller to handle creation of a product with Stripe payment integration
export const createProduct = async (req: Request, res: Response) => {
  try {
    // Extract product fields from request body
    const {
      title,
      description,
      price,
      subject,
      category,
      finalPrice,
      condition,
      classType,
      author,
      edition,
      shippingCharge,
      paymentMode,
      paymentDetails, // received as JSON string
    } = req.body;

    // Authenticated user's ID (added via middleware)
    const sellerId = req.id;

    // Uploaded images via Multer
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return response(res, 400, "Please upload at least one image");
    }

    // Parse the paymentDetails JSON string from client
    let parsedPaymentDetails;
    try {
      parsedPaymentDetails = JSON.parse(paymentDetails);
    } catch (err) {
      return response(
        res,
        400,
        "Invalid paymentDetails format (must be valid JSON)"
      );
    }

    // Validate Stripe payment required fields
    if (
      paymentMode === "Stripe" &&
      (!parsedPaymentDetails.customerId ||
        !parsedPaymentDetails.paymentIntentId)
    ) {
      return response(
        res,
        400,
        "Stripe payment requires customerId and paymentIntentId"
      );
    }

    // Upload images to Cloudinary
    const uploadPromises = files.map((file) => uploadToCloudinary(file as any));
    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((img) => img.secure_url);

    // Create new product document
    const product = new Products({
      title,
      description,
      price,
      images: imageUrls,
      subject,
      category,
      finalPrice,
      condition,
      classType,
      author,
      edition,
      shippingCharge,
      seller: sellerId,
      paymentMode,
      paymentDetails: parsedPaymentDetails,
    });

    // Save product to DB
    await product.save();

    return response(res, 200, "Product created successfully", product);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};
