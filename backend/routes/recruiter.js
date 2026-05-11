const express = require("express");
const router = express.Router();

router.get("/test", (req,res)=>{
    res.send("Recruiter route working");
});
const { protect } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/recruiterControllers");
const { getRecruiterJobs } =require("../controllers/recruiterControllers");
const { deleteJob } =require("../controllers/recruiterControllers");
const {getJobApplications } =require("../controllers/recruiterControllers");
const {  updateApplicationStatus } =require("../controllers/recruiterControllers");

router.get("/dashboard-stats", protect,getDashboardStats);

// Manage jobs table
router.get("/jobs",  protect, getRecruiterJobs);


// Delete job
router.delete("/jobs/:id",protect, deleteJob);


// Applications for job
router.get("/applications/:jobId", protect, getJobApplications);


// Shortlist / Reject / Hire
router.patch("/applications/:id", protect, updateApplicationStatus);

module.exports = router;