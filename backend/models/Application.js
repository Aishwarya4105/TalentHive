const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    
    enum: ["pending", "shortlisted", "rejected", "interview"],
    default: "pending"
  }
}, { timestamps: true });

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);