const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  c_password: {type: String, required: false },
  isVerified: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
