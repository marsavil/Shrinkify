import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  url: { type: String, required: true},
  shortUrl: { type: String, required: true, unique: true },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  clicks: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
export default Link;