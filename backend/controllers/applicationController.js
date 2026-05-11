const Application = require("../models/Application");
const Job = require("../models/Job");
const sendEmail = require("../utils/emailSender");

exports.applyJob = async (req, res) => {
  const application = await Application.create({
    job: req.params.jobId,
    applicant: req.user._id
  });

  const job = await Job.findById(req.params.jobId).populate("createdBy");

  await sendEmail(
    job.createdBy.email,
    "New Job Application",
    "Someone applied to your job."
  );

  res.status(201).json(application);
};

exports.viewApplicants = async (req, res) => {
  const applications = await Application.find({ job: req.params.jobId })
    .populate("applicant", "name email resume")
    .populate("job", "title"); 


  res.json(applications);
};


exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application)
    return res.status(404).json({ message: "Application not found" });

  application.status = status;
  await application.save();

  res.json(application);
};



exports.getMyApplications = async (req, res) => {
  try {

    if(!req.user){
      return res.status(401).json({message:"user not found"});
    }
    const applications = await Application.find({
      applicant: req.user._id
    }).populate("job");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log("req.user:",req.user);
  }
};

exports.getRecruiterApplications = async (req, res) => {
  try {

    console.log("USER:", req.user); 

    // get jobs of this recruiter
    const jobs = await Job.find({ employer_id: req.user.id });

    console.log("JOBS:", jobs);

    const jobIds = jobs.map(job => job._id);

    //  get applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate("applicant", "name email")
      .populate("job", "title");

    console.log("APPLICATIONS:", applications);

    res.json(applications);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};