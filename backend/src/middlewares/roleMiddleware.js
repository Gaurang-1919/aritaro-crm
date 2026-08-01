import apierror from "../utils/apierror.js";

//Role Based Authorization//
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return next(
                new apierror(401, "Authentication required")
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                new apierror(
                    403,
                    "You are not authorized to perform this action"
                )
            );
        }

        next();
    };
};

export { authorizeRoles, authorizeRoles as authorize };
