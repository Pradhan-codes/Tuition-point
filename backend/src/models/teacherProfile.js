import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    subjects: [
      {
        type: String,
        trim: true,
      },
    ],

    hourlyRate: {
      type: Number,
      required: true,
      min: 0,
    },

    teachingMode: {
      type: String,
      enum: ["online", "home", "both"],
      required: true,
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    teachingRadius: {
      type: Number,
      default: 5,
      min: 0,
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

    qualifications: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);
teacherProfileSchema.index({ location: "2dsphere" });

export const TeacherProfile = mongoose.model(
  "TeacherProfile",
  teacherProfileSchema
);