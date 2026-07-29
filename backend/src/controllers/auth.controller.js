import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import User from "../models/User.models.js";
import { generateTokens } from "../utils/generateTokens.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

//Register User//

const register = asyncHandler(async (req, res) => {

    const {
        name,
        email,
        password,
        role,
        permissions,
    } = req.body;

    if (!name?.trim()) {
        throw new apierror(400, "Name is required");
    }

    if (!email?.trim()) {
        throw new apierror(400, "Email is required");
    }

    if (!password?.trim()) {
        throw new apierror(400, "Password is required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new apierror(409, "User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        permissions,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new apiresponse(
                201,
                {
                    user: createdUser,
                    accessToken,
                    refreshToken,
                },
                "User registered successfully"
            )
        );
});

//Login User//

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        throw new apierror(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new apierror(401, "Invalid credentials");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new apierror(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new apiresponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "Login successful"
            )
        );
});

//Logout User//

const logout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new apiresponse(
                200,
                {},
                "Logout successful"
            )
        );
});

//Refresh Access Token//

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new apierror(401, "Refresh token is required");
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

    } catch (error) {
        throw new apierror(401, "Invalid refresh token");
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
        throw new apierror(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new apierror(401, "Refresh token has expired or is invalid");
    }

    const { accessToken, refreshToken } =
        await generateTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new apiresponse(
                200,
                {
                    accessToken,
                    refreshToken,
                },
                "Access token refreshed successfully"
            )
        );
});

//Get Current User//

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
        .select("-password -refreshToken");

    if (!user) {
        throw new apierror(404, "User not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            user,
            "Current user fetched successfully"
        )
    );
});

//Change Password//

const changePassword = asyncHandler(async (req, res) => {

    const {
        oldPassword,
        newPassword,
    } = req.body;

    const user = await User.findById(req.user._id)
        .select("+password");

    if (!user) {
        throw new apierror(404, "User not found");
    }

    const isPasswordCorrect =
        await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new apierror(400, "Old password is incorrect");
    }

    user.password = newPassword;
    await user.save();
    return res.status(200).json(
        new apiresponse(
            200,
            {},
            "Password changed successfully"
        )
    );
});

export {
    register,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    changePassword,
};