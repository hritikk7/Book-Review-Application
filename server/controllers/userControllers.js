const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register User
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("email,  password", email, password);
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "User already exists !!",
      });
    }
    const lowerEmail = email.toLowerCase();
    const hashedPassKey = bcrypt.hashSync(password, 8);
    const newUser = User({
      user_id: uuidv4(),
      email: lowerEmail,
      password: hashedPassKey,
    });

    await newUser.save();

    return res.status(200).json({
      message: "Registration Succesfull",
    });
  } catch (err) {
    console.log("Error regestring  user:", err);
    return res.status(500).json({ error: "Error regestring user" });
  }
};

//Login for a patient
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log(user);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("isMatch", isMatch);
      if (!isMatch) {
        return res.status(401).json({
          message: "password dosent match",
        });
      }
      const token = jwt.sign({ id: user._id, email }, "ssssh", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "Login Succesfull",
        token,
      });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (err) {
    console.log("Error loggin  user:", err);
    return res.status(500).json({ error: "Error regestring user" });
  }
};
