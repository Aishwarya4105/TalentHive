const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.skills = req.body.skills || user.skills;
    user.company_name = req.body.company_name || user.company_name;

    // optional fields 
    user.headline = req.body.headline || user.headline;
    user.location = req.body.location || user.location;
    user.phone = req.body.phone || user.phone;
    user.about = req.body.about || user.about;
    user.education = req.body.education || user.education;

user.company_name = req.body.company_name || user.company_name;
user.company_about = req.body.company_about || user.company_about;



if (req.files) {
  req.files.forEach(file => {
    if (file.fieldname === "profileImage") {
      user.profileImage = file.path;
    }

    if (file.fieldname === "resume") {
      user.resume = file.path;
    }

    if (file.fieldname === "company_logo") {
      user.company_logo = file.path;
    }
  });
}


    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};