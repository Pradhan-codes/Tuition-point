import { TeacherProfile } from "../models/teacherProfile.js";

// Create or update teacher profile
export const updateTeacherProfile = async (req, res) => {
  try {
    const { bio, subjects, hourlyRate, teachingMode, experienceYears } = req.body;

    const profile = await TeacherProfile.findOneAndUpdate(
      { user: req.user._id },
      { bio, subjects, hourlyRate, teachingMode, experienceYears, user: req.user._id },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Teacher profile saved successfully",
      profile
    });
  } catch (err) {
    res.status(409).json({success: false, message: " Request failed."})
  }
};

// Get current teacher profile
export const getTeacherProfile = async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({ user: req.user._id }).populate(
      "user",
      "name email phone"
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: "Teacher profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(409).json({success: false, message: "Request failed."});
  }
};

// Search teachers via subjects and basic filters (No Geo-queries yet)
export const searchTeachers = async (req, res) => {
  try {
    const { subject, maxPrice, mode } = req.query;
    const filter = {};

    if (subject) {
      filter.subjects = { $regex: subject, $options: "i" };
    }

    if (maxPrice) {
      filter.hourlyRate = { $lte: Number(maxPrice) };
    }

    if (mode && mode !== "both") {
      filter.teachingMode = { $in: [mode, "both"] };
    }

    const teachers = await TeacherProfile.find(filter).populate(
      "user",
      "name email phone"
    );

    res.status(200).json({
      success: true,
      count: teachers.length,
      teachers
    });
  } catch (err) {
      res.status(409).json({success: false, message: " Request failed."});
  }
};