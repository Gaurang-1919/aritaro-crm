import asyncHandler from "../utils/asyncHandler.js";
import apierror from "../utils/apierror.js";
import apiresponse from "../utils/apiresponse.js";
import Conversation from "../models/Conversation.models.js";

const createConversation = asyncHandler(async (req, res) => {
    const conversation = await Conversation.create(req.body);

    return res.status(201).json(
       new apiresponse(
              200,
              conversations,
              "Conversations fetched successfully"
            )
    );
});

const getAllConversations = asyncHandler(async (req, res) => {
    const conversations = await Conversation.find()
        .populate("leadId")
        .populate("userId", "name email role")
        .sort({ createdAt: -1 });

    return res.status(200).json(
          new apiresponse(
              200,
              conversations,
             "Conversations fetched successfully"
            )
    );
});

const getConversationById = asyncHandler(async (req, res) => {
    const conversation = await Conversation.findById(req.params.id)
        .populate("leadId")
        .populate("userId", "name email role");

    if (!conversation) {
        throw new apierror(404, "Conversation not found");
    }

    return res.status(200).json(
        new apiresponse(
             200,
             conversations,
             "Conversations fetched successfully"
            )
    );
});

const updateConversation = asyncHandler(async (req, res) => {
    const conversation = await Conversation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!conversation) {
        throw new apierror(404, "Conversation not found");
    }

    return res.status(200).json(
        new apiresponse(
             200,
             conversations,
             "Conversations fetched successfully"
            )
    );
});

const deleteConversation = asyncHandler(async (req, res) => {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
        throw new apierror(404, "Conversation not found");
    }

    await conversation.deleteOne();

    return res.status(200).json(
        new apiresponse(
            200,
            "Conversation deleted successfully"
        )
    );
});

export {
    createConversation,
    getAllConversations,
    getConversationById,
    updateConversation,
    deleteConversation,
};