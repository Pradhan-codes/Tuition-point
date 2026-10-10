import { StudentProfile } from "../models/studentProfile.js";

// Create or update student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const allowedFields = [
      "grade",
      "board",
      "subjectsNeeded",
      "preferredMode",
      "location",
      "preferredRadius",
      "budget",
      "availability",
      "learningPreferences",
    ];
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => Object.hasOwn(req.body, field))
        .map((field) => [field, req.body[field]])
    );

    const profile = await StudentProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { ...updates, user: req.user.id } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate("user", "name email phone");

    return res.status(200).json({
      success: true,
      message: "Student profile saved successfully",
      profile
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message || "Could not save student profile." });
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
