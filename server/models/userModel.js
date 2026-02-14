import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAT: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false }, // default will be unverified
  resetOtp: { type: String, default: "" }, // default will be unverified
  resetOtpExpireAT: { type: Number, default: 0 },
});
