import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "ecommerce_products",
      allowed_formats: ["jpg", "png", "jpeg"]
    };
  }
});

export const upload = multer({ storage });
