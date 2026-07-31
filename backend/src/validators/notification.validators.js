import { body } from "express-validator";

export const validateCreateNotification = [
    body("recipient")
        .notEmpty()
        .withMessage("Recipient is required")
        .isMongoId()
        .withMessage("Invalid recipient ID"),

    body("leadId")
        .optional()
        .isMongoId()
        .withMessage("Invalid Lead ID"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required"),

    body("status")
        .optional()
        .isIn(["unread", "read"])
        .withMessage("Invalid notification status"),
];

export const validateUpdateNotification = [
    body("message")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Message cannot be empty"),

    body("status")
        .optional()
        .isIn(["unread", "read"])
        .withMessage("Invalid notification status"),
];