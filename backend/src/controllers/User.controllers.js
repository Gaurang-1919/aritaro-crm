import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import User from "../models/User.models.js";

const userRegister=asyncHandler(async(req,res)=>{
    const {name,email,password,role}=req.body
    if(!email){
        throw new apierror(402,"Email is required")
    }

    if(!name){
        throw new apierror(402,"Name is required")
    }

    if(!password){
        throw new apierror(402,"Password is required")
    }
    if(!role){
        throw new apierror(402,"Role is required")
    }
    
    const existedUser=await User.findOne({email}).select("+password")

    if(existedUser){
        throw new apierror(409,"User already exists")
    }

    const user=await User.create(
        {
            email,name,password,role
        },
    )
    const createduser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new apiresponse(201,"User registerd successfully")
    )

});

export default userRegister
