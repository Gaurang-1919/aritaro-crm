import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    source: {
      type: String,
      enum: [
        "website",
        "facebook",
        "instagram",
        "linkedin",
        "google",
        "referral",
        "cold_call",
        "other",
      ],
      default: "other",
    },

    status: {
      type: String,
      enum: [
        "new",
        "proposal",
        "deposit",
        "follow_up_ongoing",
        "meeting_follow_up",
        "won",
        "lost",
      ],
      default: "new",
    },

    setter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    closer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    firstContactAt: {
      type: Date,
    },

    meetingBookedAt: {
      type: Date,
    },

    meetingDate: {
      type: Date,
    },

    meetingStatus: {
      type: String,
      enum: [
        "show",
        "no_show",
        "rescheduled",
        "cancelled",
        "dq",
      ],
    },

    offerMade: {
      type: Boolean,
      default: false,
    },

    saleType: {
      type: String,
      enum: ["one_call_sale", "follow_up_sale"],
    },

    depositAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalDealValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    cashCollected: {
      type: Number,
      default: 0,
      min: 0,
    },

    refundAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    commissionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    commissionEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastTouchAt: {
      type: Date,
    },

    followUpStatus: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ setter: 1 });
leadSchema.index({ closer: 1 });
leadSchema.index({ meetingDate: 1 });

//Compound indexes
leadSchema.index({
    setter: 1,
    status: 1
});

leadSchema.index({
    closer: 1,
    status: 1
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;