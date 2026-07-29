import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import Notification from "../models/Notification.models.js";

const createNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.create(req.body);

    return res.status(201).json(
        new apiresponse(
            201,
            "Notification created successfully",
            notification
        )
    );
});

const getAllNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find()
        .populate("recipient", "name email role")
        .populate("leadId")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiresponse(
            200,
            "Notifications fetched successfully",
            notifications
        )
    );
});

const getNotificationById = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id)
        .populate("recipient", "name email role")
        .populate("leadId");

    if (!notification) {
        throw new apierror(404, "Notification not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Notification fetched successfully",
            notification
        )
    );
});

const updateNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!notification) {
        throw new apierror(404, "Notification not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            "Notification updated successfully",
            notification
        )
    );
});

const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        throw new apierror(404, "Notification not found");
    }

    await notification.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
            "Notification deleted successfully"
        )
    );
});

export {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
};