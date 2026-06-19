import {Subscription} from "../models/subscription.model.js";
import {User} from "../models/user.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const subscriptionToggle = asyncHandler(async (req, res) => {
  const {channelId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new APIError(400, "Invalid Channel Id");
  }

  const channel = await User.findById(channelId);
  if (!channel) {
    throw new APIError(404, "Channel not Found");
  }

  if (channelId === req.user._id.toString()) {
    throw new APIError(401, "User can't subscribe to his own channel.");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  let subscription = false;
  if (existingSubscription) {
    subscription = await Subscription.findByIdAndDelete(
      existingSubscription._id,
    );
  } else {
    subscription = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    subscription = true;
  }

  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        subscription,
        `User ${subscription ? "subscribed" : "un-subscribed"} this channel suffessfully`,
      ),
    );
});

const getSubscribedChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const subscriptions = await Subscription.find({
    subscriber: userId,
  }).populate("channel", "fullname username avatar");

  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        subscriptions,
        "User Subscribtions Fetched Successfully",
      ),
    );
});

const getChannelSubscriptions = asyncHandler(async (req, res) => {
  const channelId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new APIError(400, "Invalid Channel Id");
  }

  const channel = await User.findById(channelId);

  if (!channel) {
    throw new APIError(404, "Channel Not Found");
  }

  const subscriptions = await Subscription.find({
    channel: channelId,
  }).populate("subscriber", "fullname username avatar");

  return res
    .status(200)
    .json(
      new APIResponse(200, subscriptions, "Subscribtions Fetched Successfully"),
    );
});

export {subscriptionToggle, getSubscribedChannel, getChannelSubscriptions};
