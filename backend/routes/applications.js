const router = require("express").Router();
const { applyJob, viewApplicants, updateStatus,getMyApplications} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getRecruiterApplications } = require("../controllers/applicationController");

router.post("/:jobId", protect, authorizeRoles("job_seeker"), applyJob);
router.get("/my",protect, getMyApplications);
router.get("/recruiter",protect,authorizeRoles("employer"),getRecruiterApplications);
router.get("/:jobId", protect, authorizeRoles("employer"), viewApplicants);



router.put("/status/:id",
  protect,
  authorizeRoles("employer"),
  updateStatus
);




module.exports = router;


