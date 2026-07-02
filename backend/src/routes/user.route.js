import {Router} from "express";
import {
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/me").get(verifyJWT, getCurrentUser);

router.route("/me").patch(verifyJWT, updateAccountDetails);

router
  .route("/me/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/me/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/channels/:username").get(verifyJWT, getUserChannelProfile);
router.route("/me/watch-history").get(verifyJWT, getWatchHistory);

export default router;