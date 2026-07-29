import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import Meeting from "../models/Meeting.models.js";

const createMeeting = asyncHandler(async (req, res) => {
    const meeting = await Meeting.create(req.body);

    return res.status(201).json(
        new apiresponse(
            201,
            "Meeting created successfully",
            meeting
        )
    );
});

const getAllMeetings = asyncHandler(async (req, res) => {
    const meetings = await Meeting.find()
        .populate("leadId")
        .populate("setter", "name email role")
        .populate("closer", "name email role")
        .sort({ meetingDate: 1 });

    return res.status(200).json(
        new apiresponse(
            200,
            "Meetings fetched successfully",
            meetings
        )
    );
});

const getMeetingById = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id)
        .populate("leadId")
        .populate("setter", "name email role")
        .populate("closer", "name email role");

    if (!meeting) {
        throw new apierror(404, "Meeting not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Meeting fetched successfully",
            meeting
        )
    );
});

const updateMeeting = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!meeting) {
        throw new apierror(404, "Meeting not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Meeting updated successfully",
            meeting
        )
    );
});

const deleteMeeting = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        throw new apierror(404, "Meeting not found");
    }

    await meeting.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
            "Meeting deleted successfully"
        )
    );
});

export {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
};