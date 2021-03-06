import mongoose from "mongoose";
import Host from "../util/host";

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
      validate: {
        validator: (v: string) => {
          return /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-+_!@#$%^&*.,?])[A-Za-z][A-Za-z\d-+_!@#$%^&*.,?]{7,}/.test(
            v
          );
        },
        message:
          "Invalid password format. " +
          "Password must be at least 8 characters long, " +
          "start with letter, " +
          "have at least one lower and upper case letter, " +
          "digit and special character",
      },
      minlength: [8, "Password too short"],
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
       * 1 -> advertiser
       * 2 -> buyer
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
        return Host.getHostUrl() + "/public/u/default.svg";
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
