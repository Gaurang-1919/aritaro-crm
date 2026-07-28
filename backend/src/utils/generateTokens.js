import asyncHandler from "./utils/asyncHandler.js";
import User from "../models/User.models.js";
import apierror from "./utils/apierror.js";


const generateTokens=async(userId)=>{

    try {
        const user=await User.findById(userId);

        if (!user) {
               throw new apierror(404, "User not found while generating tokens");
        }
        const accessToken=await user.generateAccessToken();
        const refreshToken=await user.generateRefreshToken();
          
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};

    } catch (error) {
        console.log(error)
        throw new apierror(403,"something went wrong while generating access and refresh token")
    }
}

export {generateTokens}