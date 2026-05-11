const Job = require("../models/Job");

exports.createJob = async (req, res) => {

  try {

    const job = new Job({
      ...req.body,
      employer_id: req.user.id  
    });

    await job.save();

    res.json({
      message: "Job created successfully",
      job
    });
console.log(req.user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.getJobs = async (req, res) => {
  const { page = 1, limit = 5, keyword, location } = req.query;

  const query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (req.user && req.user.role === "employer") {
    query.employer_id = req.user.id;
  }

  const jobs = await Job.find(query)
    .populate("employer_id", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Job.countDocuments(query);

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    jobs
  });
};

exports.deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // check employer exists
    if (!job.employer_id) {
      return res.status(400).json({ message: "Employer not found in job" });
    }

    if (job.employer_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: error.message });

  }

};


const Application = require("../models/Application");

exports.getRecruiterStats = async (req, res) => {
  const jobs = await Job.find({ employer_id: req.user._id });

  const jobIds = jobs.map(job => job._id);

  const totalApplications = await Application.countDocuments({
    job: { $in: jobIds }
  });

  res.json({
    totalJobs: jobs.length,
    totalApplications
  });
};


exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // toggle status
    job.status = job.status === "Active" ? "Closed" : "Active";

    await job.save();

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};