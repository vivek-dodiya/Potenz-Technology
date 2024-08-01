const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.get(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    try {
      let { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "No users found" });
      } else {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid token" });
          }
          return res.json({ message: "User found", decoded: user });
        });
        return res.status(200).json({ user });
      }
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
