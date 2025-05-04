const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config()

const adminUser = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD, // bu test uchun, real loyihada hash ishlating
};

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });

  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
