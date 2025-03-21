const express = require("express");
const router = express.Router();
const Roles = require("../models/Roles");
const authorizeRoles = require("../middleware/roles");
const authenticateToken = require("../middleware/auth");
const mongoose = require("mongoose");
router.post("/", async (req, res) => {
  const role = new Roles(req.body);
  await role.save();
  res.send("Role created");
});

router.get("/", async (req, res) => {
  const roles = await Roles.find();
  res.send(roles);
});
router.get("/:id", async (req, res) => {
  try {
    const role = await Roles.findById(req.params.id);
    if (!role) return res.status(404).send("Role not found");
    res.json({ name: role });
  } catch (error) {
    res.status(500).send("Error fetching role");
  }
});
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid role ID");
    }

    const result = await Roles.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Role not found");
    }

    res.status(200).send("Role deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting role");
  }
});
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid role ID");
    }

    const updatedRole = await Roles.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedRole) {
      return res.status(404).send("Role not found");
    }

    res.status(200).send({ message: "Role updated successfully", updatedRole });
  } catch (err) {
    res.status(500).send("Error updating role");
  }
});

module.exports = router;
