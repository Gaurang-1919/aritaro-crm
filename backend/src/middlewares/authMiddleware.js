import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import User from "../models/User.models.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new apierror(401, "Unauthorized request");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
    } catch (error) {
        throw new apierror(401, "Invalid or expired access token");
    }

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
        throw new apierror(401, "User not found");
    }

    req.user = user;
    next();

});
export { verifyJWT };
