import mongoose from "mongoose";

const Microlocation = new mongoose.Schema({
  city: {
    type: String,
  },
  municipality: {
    type: String,
  },
  street: {
    type: String,
  },
  locations: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
});

export default mongoose.model("Microlocation", Microlocation, "microlocations");
