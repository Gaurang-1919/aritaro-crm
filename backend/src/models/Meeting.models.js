import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    setter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    closer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    meetingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "scheduled",
        "show",
        "no_show",
        "cancelled",
        "rescheduled",
        "dq",
      ],
      default: "scheduled",
    },

    outcome: {
      type: String,
      enum: [
        "pending",
        "won",
        "lost",
        "follow_up",
      ],
      default: "pending",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Meeting=mongoose.model("Meeting", meetingSchema);