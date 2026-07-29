import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import Activity from "../models/Activity.models.js";

const createActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.create(req.body);

    return res.status(201).json(
        new apiresponse(
            201,
            "Activity created successfully",
            activity
        )
    );
});

const getAllActivities = asyncHandler(async (req, res) => {
    const activities = await Activity.find()
        .populate("userId", "name email role")
        .populate("leadId")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiresponse(
            200,
            "Activities fetched successfully",
            activities
        )
    );
});

const getActivityById = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)
        .populate("userId", "name email role")
        .populate("leadId");

    if (!activity) {
        throw new apierror(404, "Activity not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Activity fetched successfully",
            activity
        )
    );
});

const updateActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!activity) {
        throw new apierror(404, "Activity not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Activity updated successfully",
            activity
        )
    );
});

const deleteActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        throw new apierror(404, "Activity not found");
    }

    await activity.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
            "Activity deleted successfully"
        )
    );
});

export {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity,
};