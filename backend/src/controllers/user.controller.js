import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import User from "../models/User.models.js";

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, role, permissions } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new apierror(409, "User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        permissions,
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new apiresponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );
});

export default userRegister;
