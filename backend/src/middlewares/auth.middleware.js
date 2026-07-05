import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {APIError} from "../utils/APIError.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.body?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new APIError(401, "Unauthorized Access");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new APIError(401, "Invalid Access Token");
    }

    console.log("VERIFY JWT HIT");
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers.cookie);

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(401, "Invalid Access Token");
  }
});
