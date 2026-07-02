import {Router} from "express";
import {
  subscriptionToggle,
  getSubscribedChannel,
  getChannelSubscriptions,
} from "../controllers/subscription.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/channels/:channelId")
  .post(verifyJWT, subscriptionToggle);
router
  .route("/users/:userId")
  .get(verifyJWT, getSubscribedChannel);
router
  .route("/channels/:channelId/subscribers")
  .get(verifyJWT, getChannelSubscriptions);

export default router;
