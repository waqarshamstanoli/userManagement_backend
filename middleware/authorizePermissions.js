const authorizePermissions = (requiredPermissions) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || !user.role.permissions) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const userPermissionValues = user.role.permissions.map(
      (perm) => perm.value
    );
    const hasPermission = requiredPermissions.some((perm) =>
      userPermissionValues.includes(perm)
    );

    if (!hasPermission) {
      return res
        .status(403)
        .json({ message: "You don’t have permission for this action." });
    }

    next();
  };
};

module.exports = authorizePermissions;
