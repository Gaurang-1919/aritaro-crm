import { body } from "express-validator";

export const validateRegister = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .optional()
        .isIn(["admin", "manager", "setter", "closer"])
        .withMessage("Invalid role")

];

export const validateLogin = [
    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")

];

export const validateChangePassword = [
    body("oldPassword")
        .notEmpty()
        .withMessage("Old password is required"),

    body("newPassword")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters")

];