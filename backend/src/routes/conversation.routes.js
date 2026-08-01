import express from "express";
import {
    createConversation,
    getAllConversations,
    getConversationById,
    updateConversation,
    deleteConversation,
} from "../controllers/conversation.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    validateCreateConversation,
    validateUpdateConversation,
} from "../validators/conversation.validator.js";

import validate from "../validators/validate.js";

const router = express.Router();

router.use(verifyJWT);

router
    .route("/")
    .post(validateCreateConversation, validate, createConversation)
    .get(getAllConversations);

router
    .route("/:id")
    .get(getConversationById)
    .patch(validateUpdateConversation, validate, updateConversation)
    .delete(deleteConversation);

export default router;