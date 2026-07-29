import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import FollowUp from "../models/Follow.models.js";

const createFollowUp = asyncHandler(async (req, res) => {
    const followUp = await FollowUp.create(req.body);

    return res.status(201).json(
        new apiresponse(
            201,
            "Follow up created successfully",
            followUp
        )
    );
});

const getAllFollowUps = asyncHandler(async (req, res) => {
    const followUps = await FollowUp.find()
        .populate("leadId")
        .populate("userId", "name email role")
        .sort({ followUpDate: 1 });

    return res.status(200).json(
        new apiresponse(
            200,
            "Follow ups fetched successfully",
            followUps
        )
    );
});

const getFollowUpById = asyncHandler(async (req, res) => {
    const followUp = await FollowUp.findById(req.params.id)
        .populate("leadId")
        .populate("userId", "name email role");

    if (!followUp) {
        throw new apierror(404, "Follow up not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Follow up fetched successfully",
            followUp
        )
    );
});

const updateFollowUp = asyncHandler(async (req, res) => {
    const followUp = await FollowUp.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!followUp) {
        throw new apierror(404, "Follow up not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Follow up updated successfully",
            followUp
        )
    );
});

const deleteFollowUp = asyncHandler(async (req, res) => {
    const followUp = await FollowUp.findById(req.params.id);

    if (!followUp) {
        throw new apierror(404, "Follow up not found");
    }

    await followUp.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
            "Follow up deleted successfully"
        )
    );
});

export {
    createFollowUp,
    getAllFollowUps,
    getFollowUpById,
    updateFollowUp,
    deleteFollowUp,
};