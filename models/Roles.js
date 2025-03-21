const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Roles", roleSchema);