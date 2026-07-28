import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      required: true,
      trim: true,
    },

    outcome: {
      type: String,
      enum: [
        "interested",
        "not_interested",
        "follow_up",
        "meeting_booked",
        "no_response",
        "wrong_number",
        "other",
      ],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

export default Conversation=mongoose.model("Conversation", conversationSchema);