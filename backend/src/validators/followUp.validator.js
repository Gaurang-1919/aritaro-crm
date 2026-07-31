import { body } from "express-validator";

export const validateCreateFollowUp = [
    body("leadId")
        .notEmpty()
        .withMessage("Lead ID is required")
        .isMongoId()
        .withMessage("Invalid Lead ID"),

    body("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid User ID"),

    body("followUpDate")
        .notEmpty()
        .withMessage("Follow-up date is required")
        .isISO8601()
        .withMessage("Invalid follow-up date"),

    body("notes")
        .trim()
        .notEmpty()
        .withMessage("Follow-up notes are required"),

    body("status")
        .optional()
        .isIn([
            "pending",
            "completed",
            "missed",
        ])
        .withMessage("Invalid follow-up status"),
];

export const validateUpdateFollowUp = [
    body("followUpDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid follow-up date"),

    body("notes")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Notes cannot be empty"),
];