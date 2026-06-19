import {Router} from "express";
import {
  subscriptionToggle,
  getSubscribedChannel,
  getChannelSubscriptions,
} from "../controllers/subscription.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/toggle-subscribe/:channelId")
  .post(verifyJWT, subscriptionToggle);
router
  .route("/subscribed-channel/:userId")
  .get(verifyJWT, getSubscribedChannel);
router
  .route("/channel-subscribers/:channelId")
  .get(verifyJWT, getChannelSubscriptions);

export default router;
