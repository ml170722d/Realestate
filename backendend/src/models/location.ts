import mongoose from "mongoose";

const Location = new mongoose.Schema({
  city: {
    type: String,
  },
  municipality: {
    type: String,
  },
  street: {
    type: String,
  },
  microlocations: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
});

export default mongoose.model("Location", Location, "locations");
