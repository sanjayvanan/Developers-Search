const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: { type: String, default: null },
  short_intro: { type: String, default: null },
  bio: { type: String, default: null },
  profile_image: { type: String, default: "profiles/user-default.png" },
  social_github: { type: String, default: null },
  social_twitter: { type: String, default: null },
  social_linkedin: { type: String, default: null },
  social_youtube: { type: String, default: null },
  social_website: { type: String, default: null },
  created: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
