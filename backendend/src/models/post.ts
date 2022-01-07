import mongoose from "mongoose";

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  microlocation: {
    type: String,
    required: true,
  },
  street: {
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
    type: Number,
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
    type: String,
    enum: ["YES", "NO"],
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
          "terrace",
          "basement",
          "Internet",
          "garage",
          "intercom",
          "garden",
          "phone",
          "elevator",
          "climate",
          "loggia",
          "franc. balcony",
        ],
      },
    ],
    required: true,
  },
  type: {
    type: String,
    enum: ["APARTMENT", "HOUSE", "COTTAGE", "SHOP", "WAREHOUSE"],
    required: true,
  },
  advertiser: [
    {
      id: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Post", Post, "posts");
