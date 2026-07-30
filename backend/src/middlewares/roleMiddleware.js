import apierror from "../utils/apierror.js";

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new apierror(403, "You do not have permission to perform this action")
      );
    }
    next();
  };
};

export { authorize };

