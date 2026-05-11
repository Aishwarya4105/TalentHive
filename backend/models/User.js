const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: String,
authProvider: {
  type: String,
  enum: ["local", "google"],
  default: "local"
},
  role: {
    type: String,
    enum: ["job_seeker", "employer", "admin"],
    default: "job_seeker"
  },

  skills: [String],
  resume: String,

  company_name: String,
  company_logo: String,
company_about: String,

  headline: String,
  location: String,
  phone: String,
  about: String,
  education: String,
  profileImage: String,

}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);
