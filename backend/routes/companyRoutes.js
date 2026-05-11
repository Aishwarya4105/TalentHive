const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL COMPANIES
router.get("/", async (req, res) => {
  try {

    const companies = await User.find({
      role: "employer"
    }).select(
      "company_name location company_about company_logo"
    );

    res.json(companies);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;