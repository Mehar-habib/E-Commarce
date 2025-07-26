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

// Controller: Fetch all products from the database
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Fetch products and sort them by most recently created, then populate seller info
    const products = await Products.find()
      .sort({ createdAt: -1 })
      .populate("seller", "name email"); // Only fetch name and email of seller

    // Send success response with product list
    return response(res, 200, "Products retrieved successfully", products);
  } catch (error) {
    console.log(error);
    // Send internal server error if something goes wrong
    return response(res, 500, "Something went wrong");
  }
};

// Controller: Get a single product by its MongoDB _id
export const getProductById = async (req: Request, res: Response) => {
  try {
    // Find product by ID and deeply populate seller's details along with addresses
    const product = await Products.findById(req.params.id).populate({
      path: "seller",
      select: "name email profilePicture phoneNumber addresses",
      populate: {
        path: "addresses",
        model: "Address",
      },
    });

    // If product not found, return 404
    if (!product) {
      return response(res, 404, "Product not found");
    }

    // Send product in response
    return response(res, 200, "Product retrieved successfully", product);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

// Controller: Delete a product by its ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Find and delete the product by ID
    const product = await Products.findByIdAndDelete(req.params.productId);

    // If product not found, return 404
    if (!product) {
      return response(res, 404, "Product not found");
    }

    // Send success response
    return response(res, 200, "Product deleted successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

// Controller: Get all products created by a specific seller
export const getProductBySellerId = async (req: Request, res: Response) => {
  try {
    const sellerId = req.params.sellerId;

    // Validate if seller ID is provided
    if (!sellerId) {
      return response(
        res,
        404,
        "Seller not found please provide a valid seller id"
      );
    }

    // Find all products where seller field matches the provided sellerId
    const products = await Products.find({ seller: sellerId })
      .sort({ createdAt: -1 })
      .populate("seller", "name email profilePicture phoneNumber addresses");

    // If no products found, return 404
    if (!products) {
      return response(res, 404, "Product not found for this seller");
    }

    // Send products list in response
    return response(
      res,
      200,
      "Product fetched by sellerId successfully",
      products
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};
