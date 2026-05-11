 const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id || decoded._id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      console.log(" USER:", req.user);   // DEBUG

      next();
    } else {
      return res.status(401).json({ message: "No token" });
    }

  } catch (error) {
    console.log(" AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }


};