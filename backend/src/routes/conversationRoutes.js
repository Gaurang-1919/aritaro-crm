
import express from "express";
import {
  createConversation,
  getAllConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(createConversation).get(getAllConversations);

router
  .route("/:id")
  .get(getConversationById)
  .patch(updateConversation)
  .delete(deleteConversation);

export default router;
