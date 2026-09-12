import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    mode: {
      type: String,
      enum: ["online", "home"],
      required: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 300
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { 
    timestamps: true,
    versionKey: false,
    strict: "throw"
   }
);

export const Request = mongoose.model("Request", requestSchema);