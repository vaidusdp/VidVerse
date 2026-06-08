import {User} from "../models/user.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const {fullname, username, email, password} = req.body;

  if (
    [fullname, username, email, password].some((feild) => feild.trim() === "")
  ) {
    throw new APIError(400, "All Feilds Are Required");
  }

  const existedUser = await User.findOne({
    $or: [{email}, {username}],
  });

  if (existedUser) {
    throw new APIError(400, "User with this email/username already exists!");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Avatar Uploaded:", avatar);
  } catch (error) {
    console.log("Avatar Uploaded Failed: " + error);
    throw new APIError(500, "Failed To Upload Avatar");
  }

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("Cover Image Uploaded: " + coverImage);
  } catch (error) {
    console.log("Cover Image Uploaded Failed: " + error);
    throw new APIError(500, "Failed To Upload Cover Image");
  }

  try {
    const user = await User.create({
      fullname,
      username: username.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage.url || "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    if (!createdUser) {
      throw new APIError(500, "Something went wrong while registring user");
    }

    return res
      .status(200)
      .json(new APIResponse(200, createdUser, "User Registered Successfully"));
  } catch (error) {
    console.log("User Registration Failed");
    if (avatar) await deleteFromCloudinary(avatar.public_id);
    if (coverImage) await deleteFromCloudinary(coverImage.public_id);

    return new APIError(
      500,
      "Something went wrong while creating user and images deleted",
    );
  }
});

export {registerUser};
