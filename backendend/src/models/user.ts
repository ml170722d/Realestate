import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  birthday: {
    type: Array,
  },
  type: {
    type: String,
    enum: ["Buyer", "Advertiser", "Administrator"],
  },
  imgUrl: {
    type: String,
  },
});

export default mongoose.model("User", User, "users");
