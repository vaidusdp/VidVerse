import {v2 as cloudinary} from "cloudinary";
import fs, {existsSync} from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File Uploaded Successfully. \nFile Url: " + response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Deleted From Cloudinary. \nPublic Id:", result.url);
    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    console.log("Error deleting from cloudinary", error);
    return null;
  }
};

export {uploadOnCloudinary, deleteFromCloudinary};
