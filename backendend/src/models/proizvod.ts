import mongoose from "mongoose";

const RealEstate = new mongoose.Schema({
  title: {
    type: String,
  },
  city: {
    type: String,
  },
  municipality: {
    type: String,
  },
  microlocation: {
    type: String,
  },
  street: {
    type: String,
  },
  area: {
    type: Number,
  },
  rooms: {
    type: Number,
  },
  constructionYear: {
    type: Number,
  },
  state: {
    type: String,
  },
  heating: {
    type: String,
  },
  floor: {
    type: Number,
  },
  totalFloors: {
    type: Number,
  },
  parking: {
    type: String,
    enum: ["YES", "NO"],
  },
  monthlyUtilities: {
    type: Number,
  },
  price: {
    type: Number,
  },
  about: {
    type: String,
  },
  characteristics: {
    type: Array,
    enum: [
      "terrace",
      "basement",
      "Internet",
      "garage",
      "intercom",
      "with garden",
      "phone",
      "elevator",
      "climate",
      "loggia",
      "franc. balcony",
    ],
  },
  type: {
    type: String,
    enum: ["Apartment", "House", "Studio", "OfficeSpace"],
  },
  // TODO see how to ref many advertiser from here and if is it possible at all
  //   advertiser: {
  //     type: Array,
  //   },
});

export default mongoose.model("RealEstate", RealEstate, "realestates");
