import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    grade: {
      type: String,
      required: true,
      trim: true,
    },

    board: {
      type: String,
      trim: true,
    },

    subjectsNeeded: [
      {
        type: String,
        trim: true,
      },
    ],

    preferredMode: {
      type: String,
      enum: ["online", "home", "both"],
      default: "both",
    },

    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },

    preferredRadius: {
      type: Number,
      default: 5,
    },

    budget: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },

    availability: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
        },
        startTime: String,
        endTime: String,
      },
    ],

    learningPreferences: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

export const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);