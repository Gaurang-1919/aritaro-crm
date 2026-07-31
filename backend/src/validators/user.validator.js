import { body } from "express-validator";

export const validateCreateUser = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .optional()
        .isIn([
            "admin",
            "manager",
            "setter",
            "closer",
        ])
        .withMessage("Invalid role"),

    body("permissions")
        .optional()
        .isArray()
        .withMessage("Permissions must be an array"),
];

export const validateUpdateUser = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("role")
        .optional()
        .isIn([
            "admin",
            "manager",
            "setter",
            "closer",
        ])
        .withMessage("Invalid role"),

    body("permissions")
        .optional()
        .isArray()
        .withMessage("Permissions must be an array"),
];