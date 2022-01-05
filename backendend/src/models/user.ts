import mongoose from "mongoose";
import IUser from "../interface/user.interface";
import Pending from "./pending";
import IPending from "../interface/pending.interfece";
import Agency from "./agency";
import IAgency from "../interface/agency.interface";

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
  const id = this._conditions._id;
  await Pending.deleteOne({ user: id });
  next();
});

User.post("insertMany", async function (next) {
  const docs: Array<IUser> = next;
  await docs.forEach(async (user) => {
    const query: IPending = { pending: 0, user: user.id };
    await Pending.insertMany(query);

    if (user.agency) {
      const query: IAgency = { id: user.agency };
      await Agency.updateOne(query, { $push: { workers: user.id } });
    }
  });
});

export default mongoose.model("User", User, "users");
