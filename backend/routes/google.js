const express = require("express");
const passport = require("../passport"); // adjust path if needed
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔹 Redirect to Google
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Callback
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.redirect(`http://localhost:5173/login-success?token=${token}`);

    } catch (err) {
      console.error(err);
      res.redirect("http://localhost:5173/login-error");
    }
  }
);

module.exports = router;
