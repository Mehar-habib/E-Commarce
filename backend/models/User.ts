// Importing necessary modules and types from mongoose and bcrypt
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define the TypeScript interface for a User document in MongoDB
export interface IUSER extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  profilePicture?: string;
  phoneNumber?: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  agreeTerms: boolean;
  addresses: mongoose.Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>; // Custom method to compare password
}

// Define the Mongoose schema for the User model
const userSchema = new Schema<IUSER>(
  {
    // Full name of the user (required)
    name: {
      type: String,
      required: true,
    },
    // Email (must be unique and required)
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password (optional for users logging in via Google)
    password: {
      type: String,
    },
    // Google ID (for OAuth login)
    googleId: {
      type: String,
    },
    // URL of the user's profile picture
    profilePicture: {
      type: String,
      default: null,
    },
    // Optional phone number
    phoneNumber: {
      type: String,
      default: null,
    },
    // Whether the user's email is verified
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Whether the user accepted terms and conditions
    agreeTerms: {
      type: Boolean,
      default: false,
    },
    // Token used for email verification
    verificationToken: {
      type: String,
      default: null,
    },
    // Token used for password reset
    resetPasswordToken: {
      type: String,
      default: null,
    },
    // Expiry time of password reset token
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
    // List of address IDs linked to the user (1-to-many relationship)
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address", // Refers to the Address model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Mongoose pre-save hook to hash password before saving the user
userSchema.pre("save", async function (next) {
  // Only hash password if it has been modified or is new
  if (!this.isModified("password")) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);

  next();
});

// Custom method to compare a plain-text password with the hashed one in DB
userSchema.methods.comparePassword = async function (
  this: IUSER,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password!);
};

// Export the User model, using the IUSER interface for type safety
export default mongoose.model<IUSER>("User", userSchema);
