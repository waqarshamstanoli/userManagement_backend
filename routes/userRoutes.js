const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/auth");
const authorizePermissions = require("../middleware/authorizePermissions");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.post(
  "/add",
  authenticateToken,
  authorizePermissions(["create_user"]),
  async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201);
    } catch (error) {
      res.status(400).json({ error: "Error creating user" });
    }
  }
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizePermissions(["edit_user"]),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(400).json({ error: "Error updating user" });
    }
  }
);

router.delete(
  "/delete/:id",
  authenticateToken,
  authorizePermissions(["delete_user"]),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }
);

module.exports = router;
