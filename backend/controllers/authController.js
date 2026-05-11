const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role
  });

  res.status(201).json({
    token: generateToken(user._id),
    user:{
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    }
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    // CHECK CURRENT PASSWORD
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Current password is incorrect"
      });

    }

    // HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};




