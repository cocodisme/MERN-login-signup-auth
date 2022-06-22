const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetExpire:{
    type: Object,
  },
  //optional
  MobileNumber:{
    type: Number,
  },
  Role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  saved: [{ shop_id: { type: String } }],
  recentSearh: [{ query: { type: String } }],
  MessagedVendors: [{ vendor_id: { type: String } }],
  RatedShops: [
    {
      shop_id: { type: String },
      Ratings: { type: Number },
    },
  ],
  settings: {
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    syncContact: { type: Boolean, default: false },
    location: { type: Boolean, default: false },
    fontSize: { type: String, enum: ["s", "m", "l"], default: "s" },
    EmailVerified: { type: Boolean, default: false },
    MobileVerified: { type: Boolean, default: false },
  },
  
},{timestamps:true});

const User = mongoose.model("User", UserSchema);

module.exports = User;
