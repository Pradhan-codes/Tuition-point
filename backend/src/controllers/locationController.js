import { resolveLocation } from "../services/locationService.js";

export const geocodeLocation = async (req, res) => {
  try {
    const location = await resolveLocation(req.query.q);
    return res.status(200).json({ success: true, location });
  } catch {
    return res.status(502).json({
      success: false,
      message: "Location search is temporarily unavailable. Please try again.",
    });
  }
};
