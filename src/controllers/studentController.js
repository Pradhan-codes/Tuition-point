import { StudentProfile } from "../models/studentProfile.js";

// Create or update student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const { grade, subjectsNeeded, preferredMode } = req.body;

    const profile = await StudentProfile.findOneAndUpdate(
      { user: req.user._id },
      { grade, subjectsNeeded, preferredMode, user: req.user._id },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Student profile saved successfully",
      profile
    });
  } catch (err) {
    res.status(409).json({success: false, message: "Request failed."})
  }
};

// Get current student profile
export const getStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user._id }).populate(
      "user",
      "name email phone"
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: "Student profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(409).json({success: false, message: "Request failed."})
  }
};