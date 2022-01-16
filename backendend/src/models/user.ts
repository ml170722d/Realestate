import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v: string) => {
          return /^[a-zA-Z0-9.!#$%&*+/=?^_|~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(
            v
          );
        },
        message: "Invalid email format",
      },
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    type: {
      /**
       * 0 -> admin
       * 1 -> buyer
       * 2 -> advertiser
       */
      type: Number,
      required: true,
      min: 0,
      max: 2,
    },
    imgUrl: {
      type: String,
      required: true,
      default: () => {
        return process.env.HOST! + "/u/default.svg";
      },
    },
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      default: null,
    },
    licence: {
      type: String,
      default: null,
    },
    access: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
      validate: {
        validator: <T>(v: Array<T>) => {
          if (v.length >= 0 && v.length <= 5) return true;
          return false;
        },
      },
    },
  },
  { emitIndexErrors: true }
);

export default mongoose.model("User", User, "users");
