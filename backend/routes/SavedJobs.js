const express = require("express");
const router = express.Router();

const SavedJob = require("../models/SavedJob");
const { protect } = require("../middleware/authMiddleware");

// SAVE / UNSAVE JOB
router.post("/:jobId", protect, async (req, res) => {

  try {

    const { jobId } = req.params;

    // CHECK IF ALREADY SAVED
    const existingJob = await SavedJob.findOne({
      user: req.user.id,
      job: jobId
    });

    // IF EXISTS -> UNSAVE
    if (existingJob) {

      await SavedJob.findByIdAndDelete(existingJob._id);

      return res.status(200).json({
        message: "Job unsaved",
        saved: false
      });
    }

    // ELSE SAVE
    const newSavedJob = await SavedJob.create({
      user: req.user.id,
      job: jobId
    });

    res.status(201).json({
      message: "Job saved",
      saved: true,
      data: newSavedJob
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});



// GET ALL SAVED JOBS

router.get("/", protect, async (req, res) => {

  try {

    const savedJobs = await SavedJob.find({
      user: req.user.id
    }).populate("job");

    res.status(200).json(savedJobs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;