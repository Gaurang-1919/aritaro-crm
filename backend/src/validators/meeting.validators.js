import { body } from "express-validator";

export const validateCreateMeeting = [

    body("leadId")
        .notEmpty()
        .withMessage("Lead ID is required")
        .isMongoId()
        .withMessage("Invalid Lead ID"),

    body("meetingDate")
        .notEmpty()
        .withMessage("Meeting date is required")
        .isISO8601()
        .withMessage("Invalid meeting date"),

    body("status")
        .optional()
        .isIn([
            "scheduled",
            "show",
            "no_show",
            "cancelled",
            "rescheduled",
            "dq",
        ])
        .withMessage("Invalid meeting status"),

    body("outcome")
        .optional()
        .isIn([
            "pending",
            "won",
            "lost",
            "follow_up",
        ])
        .withMessage("Invalid meeting outcome"),
];

export const validateUpdateMeeting = [
    body("meetingDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid meeting date"),
];