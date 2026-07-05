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
  let isSubscribed;
  if (existingSubscription) {
    subscription = await Subscription.findByIdAndDelete(
      existingSubscription._id,
    );
    isSubscribed = false;
  } else {
    subscription = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });
    isSubscribed=true;
  }

  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        subscription,
        `User ${isSubscribed ? "subscribed" : "un-subscribed"} this channel suffessfully`,
      ),
    );
});

const getSubscribedChannel = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const channels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
      },
    },

    {
      $unwind: "$channel",
    },

    {
      $lookup: {
        from: "subscriptions",
        localField: "channel._id",
        foreignField: "channel",
        as: "subscribers",
      },
    },

    {
      $lookup: {
        from: "videos",
        localField: "channel._id",
        foreignField: "owner",
        as: "videos",
      },
    },

    {
      $addFields: {
        "channel.subscribersCount": {
          $size: "$subscribers",
        },
        "channel.videosCount": {
          $size: "$videos",
        },
        "channel.isSubscribed": true,
      },
    },

    {
      $replaceRoot: {
        newRoot: "$channel",
      },
    },
  ]);

  return res.status(200).json(
    new APIResponse(
      200,
      channels,
      "Subscribed channels fetched successfully"
    )
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
