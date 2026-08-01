import apierror from "../utils/apierror.js";

const checkPermission = (...requiredPermissions) => {

    return (req, res, next) => {

        if (!req.user) {
            return next(
                new apierror(401, "Authentication required")
            );
        }

        const userPermissions = req.user.permissions || [];

        const hasPermission = requiredPermissions.every(
            permission => userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return next(
                new apierror(
                    403,
                    "You don't have permission to perform this action"
                )
            );
        }

        next();
    };
};

export { checkPermission };