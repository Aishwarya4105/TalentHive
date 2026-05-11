const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/fileUpload");
const { updateProfile, getMyProfile } = require("../controllers/userController");



router.get("/profile", protect, getMyProfile);
router.put(
  "/profile",
  protect,
upload.any([
  { name: "resume", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
    { name: "company_logo", maxCount: 1 } 
]),


  updateProfile
);

module.exports = router;