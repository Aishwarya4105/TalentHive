const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboardStats = async (req, res) => {
  try {

    const jobs = await Job.find({ employer_id: req.user.id });
    const jobIds = jobs.map(job => job._id);

    const totalJobs = jobs.length;

    const activeJobs = jobs.filter(job => job.status === "Active").length;

    const closedJobs = jobs.filter(job => job.status === "Closed").length;

    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds }
    });

    res.json({
      totalJobs,
      activeJobs,
      closedJobs,
      totalApplicants
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





exports.getRecruiterJobs = async (req, res) => {
  try {

    const jobs = await Job.find({ employer_id: req.user.id }).sort({ createdAt: -1 });

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });

        return {
          ...job._doc,
          applicantsCount: count
        };
      })
    );

    res.json({ jobs: jobsWithApplicants });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete job
exports.deleteJob = async (req, res) => {

  try {

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};




exports.getJobApplications = async (req, res) => {

  try {

    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("user", "name email");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.updateApplicationStatus = async (req, res) => {

  try {

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
