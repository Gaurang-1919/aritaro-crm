import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
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

    followUpDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "missed",
      ],
      default: "pending",
    },

    notes: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

followUpSchema.index({ userId: 1 });
followUpSchema.index({ followUpDate: 1 });
followUpSchema.index({ status: 1 });

const FollowUp = mongoose.model("FollowUp", followUpSchema);
export default FollowUp;
