import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  images: string[];
  subject: string;
  category: string;
  finalPrice: number;
  condition: string;
  classType: string;
  author: string;
  edition?: string;
  shippingCharge: string;
  seller: mongoose.Types.ObjectId;

  paymentMode: "Stripe"; // Only Stripe supported
  paymentDetails: {
    customerId: string; // Stripe Customer ID
    paymentIntentId: string; // Stripe Payment Intent ID
    receiptUrl?: string; // Optional receipt link
    paidAt?: Date; // Payment timestamp
  };
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    subject: { type: String, required: true },
    category: { type: String, required: true },
    finalPrice: { type: Number, required: true },
    condition: { type: String, required: true },
    classType: { type: String, required: true },
    author: { type: String, required: true },
    edition: { type: String },
    shippingCharge: { type: String },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },

    paymentMode: { type: String, enum: ["Stripe"], required: true },
    paymentDetails: {
      customerId: { type: String, required: true },
      paymentIntentId: { type: String, required: true },
      receiptUrl: { type: String },
      paidAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
