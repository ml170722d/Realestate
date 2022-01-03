import mongoose from "mongoose";

const Session = new mongoose.Schema({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Session", Session, "sessions");
