import { Request, Response } from "express";
import { response } from "../utils/responsiveHandler";
import Products from "../models/Products";
import CartItems, { ICartItem } from "../models/CartItems";
import WishList from "../models/WishList";

export const addToWishList = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    const product = await Products.findById(productId);
    if (!product) {
      return response(res, 404, "Product not found");
    }

    let wishList = await WishList.findOne({ user: userId });
    if (!wishList) {
      wishList = new WishList({ user: userId, products: [] });
    }
    if (!wishList.products.includes(productId)) {
      wishList.products.push(productId);
      await wishList.save();
    }
    return response(
      res,
      200,
      "Product added to wishList successfully",
      wishList
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const removeFromWishList = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { productId } = req.params;

    const wishList = await WishList.findOne({ user: userId });
    if (!wishList) {
      return response(res, 404, "WishList not found");
    }

    wishList.products = wishList.products.filter(
      (id) => id.toString() !== productId
    );
    await wishList.save();
    return response(res, 200, "Product removed from wishList successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};

export const getWishListByUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.id;
    const wishList = await WishList.findOne({ user: userId }).populate(
      "products"
    );
    if (!wishList) {
      return response(res, 404, "WishList not found");
    }
    await wishList.save();
    return response(res, 200, "WishList retrieved successfully", wishList);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Something went wrong");
  }
};
