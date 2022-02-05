import Logger from "js-logger";
import mongoose from "mongoose";
import Location from "../model/location";
import IPost from "../model/post";
import LocationShema from "./location";

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  microlocation: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  constructionYear: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  heating: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  totalFloors: {
    type: Number,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  monthlyUtilities: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  characteristics: {
    type: [
      {
        type: String,
        enum: [
          "Terrace",
          "Basement",
          "Internet",
          "Garage",
          "Intercom",
          "Garden",
          "Phone",
          "Elevator",
          "Climate",
          "Loggia",
          "Franc. balcony",
        ],
      },
    ],
    required: true,
  },
  type: {
    type: String,
    enum: ["Apartment", "House", "Cottage", "Shop", "Warehouse"],
    required: true,
  },
  // TODO think more about implementation of this
  advertiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // TODO think more about implementation of this
  pics: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
  // TODO think more about implementation of this
  published: {
    type: Date,
    default: new Date(),
  },
  // TODO think more about implementation of this
  updated: {
    type: Date,
    default: new Date(),
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

Post.post("insertMany", async (docs: Array<IPost>) => {
  docs.forEach(async (doc, index, array) => {
    const { microlocation, location } = doc;

    const update: Location = new Location();
    update.microlocations = [microlocation!];

    try {
      const result = await LocationShema.findByIdAndUpdate(
        location,
        { $addToSet: update },
        { new: true }
      );
    } catch (error) {
      Logger.error(`${error}`);
    }
  });
});

export default mongoose.model("Post", Post, "posts");
