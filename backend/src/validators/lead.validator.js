import { body } from "express-validator";

export const validateCreateLead = [

    body("leadName")
        .trim()
        .notEmpty()
        .withMessage("Lead name is required"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("source")
        .optional()
        .isIn([
            "website",
            "facebook",
            "instagram",
            "linkedin",
            "google",
            "referral",
            "cold_call",
            "other",
        ])
        .withMessage("Invalid lead source"),

    body("status")
        .optional()
        .isIn([
            "new",
            "proposal",
            "deposit",
            "follow_up_ongoing",
            "meeting_follow_up",
            "won",
            "lost",
        ])
        .withMessage("Invalid lead status"),
];

export const validateUpdateLead = [
    body("email")
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("commissionPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Commission percentage must be between 0 and 100"),

    body("depositAmount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Deposit amount cannot be negative"),

    body("totalDealValue")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Deal value cannot be negative"),
];