import mongoose from "mongoose";
import Pending from "./pending";

const User = new mongoose.Schema(
  {
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
      type: Date,
    },
    type: {
      /**
       * 0 -> admin
       * 1 -> buyer
       * 2 -> advertiser
       */
      type: Number,
      min: 0,
      max: 2,
    },
    imgUrl: {
      type: String,
      default: null,
    },
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      default: null,
    },
  },
  { emitIndexErrors: true }
);

User.pre("deleteOne", async function (next) {
  await Pending.deleteOne({ user: this._conditions._id });
  next();
});

export default mongoose.model("User", User, "users");
