import mongoose from "mongoose";

const Agency = new mongoose.Schema({
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
    type: String,
    unique: true,
  },
  city: {
    type: String,
  },
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Agency", Agency, "agency");
