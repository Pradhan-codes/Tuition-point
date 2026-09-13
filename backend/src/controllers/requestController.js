import { Request } from "../models/Request.js";

// Student sends request to a teacher
export const createRequest = async (req, res) => {
  try {
    const { teacherId, subject, mode, message } = req.body;

    const existingRequest = await Request.findOne({
      student: req.user._id,
      teacher: teacherId,
      status: "pending"
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending request with this teacher"
      });
    }

    const newRequest = await Request.create({
      student: req.user._id,
      teacher: teacherId,
      subject,
      mode,
      message
    });

    res.status(201).json({
      success: true,
      message: "Request sent successfully",
      request: newRequest
    });
  } catch (err) {
     res.status(401).json({success: false, message: "Cannot send request."})
  }
};

// Teacher updates request status (accept or reject)
export const respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status update" });
    }

    const request = await Request.findOne({ _id: id, teacher: req.user._id });
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      success: true,
      message: `Request ${status}`,
      request
    });
  } catch (err) {
    res.status(401).json({success: false, message: "Cannot send request."})
  }
};

// Get requests for logged-in user (handles both student & teacher view)
export const getMyRequests = async (req, res) => {
  try {
    const query =
      req.user.role === "student"
        ? { student: req.user._id }
        : { teacher: req.user._id };

    const requests = await Request.find(query)
      .populate("student", "name email phone")
      .populate("teacher", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (err) {
    res.status(401).json({success: false, message: "Cannot send request."})
  }
};