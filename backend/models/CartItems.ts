// Import Mongoose modules
import mongoose, { Document, Schema } from "mongoose";

// Interface for a single cart item
export interface ICartItem extends Document {
  product: mongoose.Types.ObjectId; // Reference to product
  quantity: number; // Quantity of the product
}

// Interface for a full cart containing multiple items
export interface ICart extends Document {
  user: mongoose.Types.ObjectId; // Reference to user
  items: ICartItem[]; // Array of cart items
}

// Schema for individual cart item
const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 }, // Minimum quantity is 1
});

// Schema for user cart
const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema], // Embedded cart items
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Export the Cart model
export default mongoose.model<ICart>("Cart", cartSchema);
