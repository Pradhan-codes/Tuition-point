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

// Search teachers via subjects and basic filters (Geo query)

/**
 * Search nearby teachers with radius, filters, and pagination
 * GET /api/teachers/search
 */
export const searchTeachers = async (req, res) => {
  try {
    // 1. Extract and sanitize query parameters with default fallbacks
    const {
      lng,
      lat,
      radius = 5,
      subject,
      maxPrice,
      mode,
      page = 1,
      limit = 10
    } = req.query;

    // 2. Parse pagination numbers and calculate offset (skip)
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    // 3. Convert coordinates and radius (km -> meters for GeoJSON calculations)
    const longitude = parseFloat(lng);
    const latitude = parseFloat(lat);
    const maxDistanceInMeters = parseFloat(radius) * 1000;

    // 4. Construct optional match filters to run alongside geospatial query
    const filterConditions = {};

    // Case-insensitive subject search
    if (subject) {
      filterConditions.subjects = { $regex: new RegExp(subject, "i") };
    }

    // Upper limit on hourly rate
    if (maxPrice) {
      filterConditions.hourlyRate = { $lte: parseFloat(maxPrice) };
    }

    // Teaching mode filter ('online', 'home', or 'both')
    if (mode && mode !== "both") {
      filterConditions.teachingMode = { $in: [mode, "both"] };
    }

    // 5. Run aggregation pipeline with geospatial query and faceted pagination
    const [result] = await TeacherProfile.aggregate([
      // Stage 1: Geospatial radius filtering (MUST be first stage in pipeline)
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude] // GeoJSON standard: [lng, lat]
          },
          distanceField: "distanceMeters",   // Stores computed distance in meters
          maxDistance: maxDistanceInMeters,   // Cutoff boundary
          spherical: true,                   // Calculates along curved spherical surface
          query: filterConditions            // Applies additional filters directly
        }
      },

      // Stage 2: Parallel execution via $facet for total count and sliced data
      {
        $facet: {
          // Sub-pipeline A: Calculate total number of matching teachers
          metadata: [
            { $count: "total" }
          ],

          // Sub-pipeline B: Apply pagination, joins, and shape output
          teachers: [
            // Skip previous pages' records
            { $skip: skip },

            // Limit returned records to current page size
            { $limit: limitNum },

            // Relational join with User collection to pull tutor identity
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails"
              }
            },

            // Convert userDetails array into a single embedded object
            { $unwind: "$userDetails" },

            // Omit sensitive authentication data
            {
              $project: {
                "userDetails.password": 0,
                "userDetails.__v": 0
              }
            },

            // Convert raw meters to user-friendly kilometers rounded to 2 decimals
            {
              $addFields: {
                distanceKm: {
                  $round: [{ $divide: ["$distanceMeters", 1000] }, 2]
                }
              }
            }
          ]
        }
      }
    ]);

    // 6. Extract total count and calculate total pages
    const total = result.metadata[0] ? result.metadata[0].total : 0;
    const totalPages = Math.ceil(total / limitNum);

    // 7. Return paginated response
    res.status(200).json({
      success: true,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages
      },
      teachers: result.teachers
    });
  } catch (err) {
    // Forward any runtime or casting errors to centralized error handler
    res.status(500).json({success: false, message: "Failed."})
  }
};