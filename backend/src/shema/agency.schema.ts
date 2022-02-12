import mongoose from "mongoose";

const Agency = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    pib: {
      type: Number,
      unique: true,
    },
    city: {
      type: String,
    },
  },
  {
    emitIndexErrors: true,
  }
);

export default mongoose.model("Agency", Agency, "agency");
