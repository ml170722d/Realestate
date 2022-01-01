import mongoose from "mongoose";

const Pending = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  /**
   * 0 -> requested access
   * 1 -> granted access
   * 2 -> access blocked
   */
  pending: {
    type: Number,
    min: 0,
    max: 2,
  },
});

export default mongoose.model("Pending", Pending, "pending");
