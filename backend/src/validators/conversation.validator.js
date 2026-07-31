import { body } from "express-validator";

export const validateCreateConversation = [

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

    body("notes")
        .trim()
        .notEmpty()
        .withMessage("Conversation notes are required"),

    body("outcome")
        .optional()
        .isIn([
            "interested",
            "not_interested",
            "follow_up",
            "meeting_booked",
            "no_response",
            "wrong_number",
            "other",
        ])
        .withMessage("Invalid conversation outcome"),
];

export const validateUpdateConversation = [
    body("notes")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Notes cannot be empty"),
];