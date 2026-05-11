const router = require("express").Router();
const { createJob, getJobs, deleteJob, updateJobStatus } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
 const { getRecruiterStats } = require("../controllers/jobController");
 

router.post("/", protect, authorizeRoles("employer"), createJob);
router.get("/", getJobs);
router.get("/dashboard/stats",protect,authorizeRoles("employer"),getRecruiterStats);
router.delete("/:id", protect, authorizeRoles("employer"), deleteJob);

router.put("/:id/status",protect,authorizeRoles("employer"), updateJobStatus);
module.exports = router;

