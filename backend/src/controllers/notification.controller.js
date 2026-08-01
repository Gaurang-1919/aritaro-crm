import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import Notification from "../models/Notification.models.js";

// Create Notification
const createNotification = asyncHandler(async (req, res) => {

    const notification = await Notification.create(req.body);

    return res.status(201).json(
        new apiresponse(
            201,
            notification,
            "Notification created successfully"
        )
    );
});

// Get All Notifications
const getAllNotifications = asyncHandler(async (req, res) => {

    const notifications = await Notification.find({
        recipient: req.user._id,
    })
        .populate("leadId")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiresponse(
            200,
            notifications,
            "Notifications fetched successfully"
        )
    );
});

// Get Notification By ID
const getNotificationById = asyncHandler(async (req, res) => {

    const notification = await Notification.findOne({
        _id: req.params.id,
        recipient: req.user._id,
    }).populate("leadId");

    if (!notification) {
        throw new apierror(404, "Notification not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            notification,
            "Notification fetched successfully"
        )
    );
});

// Update Notification
const updateNotification = asyncHandler(async (req, res) => {

    if (
      req.body.status &&
      !["read", "unread"].includes(req.body.status)
    ) {
       throw new apierror(400, "Invalid notification status");
    }

    const notification = await Notification.findOneAndUpdate(
        {
            _id: req.params.id,
            recipient: req.user._id,
        },
        {
            status: req.body.status,
        },
        {
            new: true,
            runValidators: true,
        }
    ).populate("leadId");

    if (!notification) {
        throw new apierror(404, "Notification not found");
    }

    return res.status(200).json(
        new apiresponse(
            200,
            notification,
            "Notification updated successfully"
        )
    );
});

// Delete Notification
const deleteNotification = asyncHandler(async (req, res) => {

    const notification = await Notification.findOne({
        _id: req.params.id,
        recipient: req.user._id,
    });

    if (!notification) {
        throw new apierror(404, "Notification not found");
    }

    await notification.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
            null,
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