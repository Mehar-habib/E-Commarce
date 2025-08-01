// Import necessary modules and models
import { Request, Response } from "express";
import { response } from "../utils/responsiveHandler"; // Custom response handler
import Products from "../models/Products"; // Product model
import CartItems, { ICartItem } from "../models/CartItems"; // Cart model and interface

// Controller to add a product to the cart
export const addCart = async (req: Request, res: Response) => {
  try {
    const userId = req.id; // Authenticated user ID from middleware
    const { productId, quantity } = req.body; // Product ID and quantity from request body

    // Check if product exists
    const product = await Products.findById(productId);
    if (!product) {
      return response(res, 404, "Product not found");
    }

    // Optionally prevent user from adding their own product (commented)
    if (product.seller.toString() === userId) {
      return response(res, 400, "You can't add your own product to cart");
    }

    // Find user's existing cart or create new one
    let cart = await CartItems.findOne({ user: userId });
    if (!cart) {
      cart = new CartItems({ user: userId, items: [] });
    }

    // Check if product already in cart, update quantity if yes
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // If not in cart, add as new item
      const newItem = {
        product: productId,
        quantity: quantity,
      };
      cart.items.push(newItem as ICartItem);
    }

    // Save cart and return success response
    await cart.save();
    return response(res, 200, "Product added to cart successfully", cart);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

// Controller to remove a product from the cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.id; // Authenticated user ID
    const { productId } = req.params; // Product ID from URL params

    // Find user's cart
    const cart = await CartItems.findOne({ user: userId });
    if (!cart) {
      return response(res, 404, "Cart not found");
    }

    // Filter out the product to remove
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Save updated cart
    await cart.save();
    return response(res, 200, "Product removed from cart successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

// Controller to get the cart by user ID
export const getCartByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // User ID from URL params

    // Find cart by user
    const cart = await CartItems.findOne({ user: userId });
    if (!cart) {
      return response(res, 404, "Cart is Empty", { items: [] });
    }

    // Return cart if found
    await cart.save();
    return response(res, 200, "Cart retrieved successfully", cart);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};
