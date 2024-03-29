import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String, 
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;