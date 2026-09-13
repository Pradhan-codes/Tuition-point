import { body, query, validationResult } from "express-validator";

// Reusable handler function placed as the final item in every validation array
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// ==================== AUTH VALIDATIONS ====================

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "teacher"])
    .withMessage("Role must be either 'student' or 'teacher'"),

  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),

  handleValidationErrors
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors
];

// ==================== PROFILE VALIDATIONS ====================

export const validateStudentProfile = [
  body("grade")
    .trim()
    .notEmpty()
    .withMessage("Class / Grade is required"),

  body("subjectsNeeded")
    .isArray({ min: 1 })
    .withMessage("At least one subject must be specified"),
  body("subjectsNeeded.*")
    .trim()
    .notEmpty()
    .withMessage("Subject name cannot be empty"),

  body("preferredMode")
    .optional()
    .isIn(["online", "home", "both"])
    .withMessage("Preferred mode must be online, home, or both"),

  handleValidationErrors
];

export const validateTeacherProfile = [
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),

  body("subjects")
    .isArray({ min: 1 })
    .withMessage("At least one subject must be specified"),
  body("subjects.*")
    .trim()
    .notEmpty()
    .withMessage("Subject name cannot be empty"),

  body("hourlyRate")
    .notEmpty()
    .withMessage("Hourly rate is required")
    .isFloat({ min: 0 })
    .withMessage("Hourly rate must be a positive number"),

  body("teachingMode")
    .notEmpty()
    .withMessage("Teaching mode is required")
    .isIn(["online", "home", "both"])
    .withMessage("Teaching mode must be online, home, or both"),

  body("experienceYears")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Experience years must be a non-negative integer"),

  // GeoJSON validation: expects { type: "Point", coordinates: [lng, lat] }
  body("location.type")
    .equals("Point")
    .withMessage("Location type must be 'Point'"),

  body("location.coordinates")
    .isArray({ min: 2, max: 2 })
    .withMessage("Coordinates must be [longitude, latitude]"),
  body("location.coordinates.*[0]")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
  body("location.coordinates.*[1]")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  handleValidationErrors
];

// ==================== SEARCH / DISCOVERY VALIDATIONS ====================

export const validateTeacherSearch = [
  query("lng")
    .notEmpty()
    .withMessage("Longitude (lng) is required for location search")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Valid longitude between -180 and 180 is required"),

  query("lat")
    .notEmpty()
    .withMessage("Latitude (lat) is required for location search")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Valid latitude between -90 and 90 is required"),

  query("radius")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Radius must be at least 1 kilometer"),

  query("subject")
    .optional()
    .trim(),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("maxPrice must be a positive number"),

  query("mode")
    .optional()
    .isIn(["online", "home", "both"])
    .withMessage("Invalid mode filter"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  handleValidationErrors
];

// ==================== REQUEST / BOOKING VALIDATIONS ====================

export const validateCreateRequest = [
  body("teacherId")
    .notEmpty()
    .withMessage("Teacher ID is required")
    .isMongoId()
    .withMessage("Invalid teacher ID format"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required"),

  body("mode")
    .notEmpty()
    .withMessage("Mode is required")
    .isIn(["online", "home"])
    .withMessage("Mode must be online or home"),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Message cannot exceed 300 characters"),

  handleValidationErrors
];