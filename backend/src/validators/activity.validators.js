import { body } from "express-validator";

export const validateCreateActivity = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid User ID"),

    body("action")
        .trim()
        .notEmpty()
        .withMessage("Action is required"),

    body("leadId")
        .optional()
        .isMongoId()
        .withMessage("Invalid Lead ID"),

    body("description")
        .optional()
        .trim(),
];

export const validateUpdateActivity = [
    body("action")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Action cannot be empty"),

    body("description")
        .optional()
        .trim(),
];