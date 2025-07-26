import multer from "multer";
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

// Extending Multer's file type to include 'path' (used by Cloudinary)
interface CustomFile extends Express.Multer.File {
  path: string;
}

// Upload a file to Cloudinary and return a promise with the result
const uploadToCloudinary = (file: CustomFile): Promise<UploadApiResponse> => {
  const options: UploadApiOptions = {
    resource_type: "image", // Specify that the resource is an image
  };

  return new Promise((resolve, reject) => {
    // Uploading file from local path to Cloudinary
    cloudinary.uploader.upload(file.path, options, (error, result) => {
      if (error) {
        return reject(error); // Handle upload error
      }
      resolve(result as UploadApiResponse); // Return the upload result
    });
  });
};

// Multer middleware to handle multiple file uploads
// - Files are temporarily stored in 'uploads/' folder
// - Limits to max 4 files under the field name 'images'
const multerMiddleware: RequestHandler = multer({ dest: "uploads/" }).array(
  "images", // Form field name for files
  4 // Max number of images
);

export { multerMiddleware, uploadToCloudinary };
