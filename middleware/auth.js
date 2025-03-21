const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/Roles");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No token provided." });
  }

  try {
    const tokenWithoutBearer = token.replace("Bearer ", "").trim();
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    const userRole = await Role.findById(decoded.role);
    if (!userRole) {
      return res.status(403).json({ message: "Invalid role" });
    }
    req.user = {
      ...decoded,
      role: userRole,
    };

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
