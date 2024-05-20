const express = require("express");
const router = express.Router();

// Example route to get all users
router.get("/", (req, res) => {
  res.json({ message: "List of users" });
});

// Example route to create a new user
router.post("/", (req, res) => {
  const newUser = req.body; // Assuming the new user data is sent in the request body
  res.status(201).json({ message: "User created", user: newUser });
});

module.exports = router;
