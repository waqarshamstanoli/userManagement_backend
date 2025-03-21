function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access Denied: Role Not Authorized");
    }
    next();
  };
}

module.exports = authorizeRoles;
