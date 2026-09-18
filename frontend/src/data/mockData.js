/**
 * TuitionPoint Marketplace - Mock & Static Data Store
 * 
 * NOTE FOR FUTURE BACKEND INTEGRATION:
 * The schema of these objects directly mirrors the backend model:
 * - `TeacherProfile` (user, subjects, hourlyRate, teachingMode, rating, location)
 * - Search parameters (`lng`, `lat`, `radius`, `subject`, `maxPrice`, `mode`)
 * When connecting Axios later, replace these static constants with API responses
 * from `/api/teachers/search`.
 */

export const HERO_DATA = {
  activeBadge: "18 Vetted Tutors Active in Kensington",
  headlineMain: "Find the Right Teacher,",
  headlineHighlight: "Near You.",
  subtitle: "Discover tutors based on what you want to learn, where you live, your budget, and how you want to learn.",
  defaultSubject: "A-Level Maths",
  defaultLocation: "Kensington, London · 2 mi radius",
  trendingSubjects: [
    "GCSE Maths",
    "A-Level Chemistry",
    "Piano",
    "Python & Coding",
    "French"
  ]
};

export const MAP_CONFIG = {
  radiusLabel: "18 verified tutors within 2 miles of you",
  userLocation: {
    label: "Your location (SW7)",
    neighborhood: "South Kensington"
  },
  priceMarkers: [
    { id: "marker-1", price: "£45/h", distance: "0.4 mi", top: "27%", left: "37%" },
    { id: "marker-2", price: "£35/h", distance: "1.2 mi", top: "67%", left: "27%" }
  ],
  featuredTutor: {
    id: "featured-elena",
    name: "Dr. Elena Rostova",
    badge: "CAMBRIDGE ALUM · PHD",
    rating: 4.98,
    reviewsCount: 214,
    distanceLabel: "0.5 mi away · Kensington",
    subjects: "Pure Maths & Stats",
    hourlyRate: 55,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256",
    top: "32%",
    left: "52%"
  }
};

export const TUTOR_FILTERS = [
  { id: "price", label: "Price: < £60/hr", active: true },
  { id: "in-person", label: "In-Person", active: true },
  { id: "dbs", label: "Verified DBS", active: true }
];

export const TUTORS_LIST = [
  {
    id: "tutor-sarah",
    name: "Sarah Jenkins, M.Sc.",
    rating: 4.98,
    reviewsCount: 74,
    education: "6 yrs tutoring · Cambridge Grad",
    distance: "0.4 mi away · Travels to you",
    subjects: ["A-Level Maths", "Further Maths"],
    mode: "In-person & Online",
    hourlyRate: 55,
    verifiedDBS: true,
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "tutor-david",
    name: "David Chen",
    rating: 5.0,
    reviewsCount: 112,
    education: "8 yrs tutoring · Imperial MEng",
    distance: "1.1 mi away · In-home / Studio",
    subjects: ["Physics & STEM", "Chemistry"],
    mode: "Studio/In-Person",
    hourlyRate: 60,
    verifiedDBS: true,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "tutor-maya",
    name: "Maya Al-Mansoor",
    rating: 4.94,
    reviewsCount: 58,
    education: "4 yrs tutoring · Oxford MA",
    distance: "1.6 mi away · Online & In-person",
    subjects: ["Biology & GCSE", "Biochemistry"],
    mode: "Flexible Mode",
    hourlyRate: 48,
    verifiedDBS: true,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "tutor-james",
    name: "James Sterling",
    rating: 4.96,
    reviewsCount: 93,
    education: "5 yrs tutoring · LSE Economics",
    distance: "1.8 mi away · Chelsea",
    subjects: ["Economics & Stats", "A-Level Business"],
    mode: "Top 1% Reviewed",
    hourlyRate: 65,
    verifiedDBS: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
  }
];

export const TRUST_FEATURES = [
  {
    id: "feat-1",
    title: "Verified Backgrounds",
    description: "Every single educator undergoes stringent identity audits, enhanced DBS checks, and diploma verifications.",
    iconType: "shield"
  },
  {
    id: "feat-2",
    title: "Neighborhood Matches",
    description: "Find teachers down your street. Zero long commutes, higher punctuality, and true local community trust.",
    iconType: "compass"
  },
  {
    id: "feat-3",
    title: "Trial Session Guarantee",
    description: "If your first lesson isn't a fantastic match for your student's learning style, get 100% money back, guaranteed.",
    iconType: "medal"
  },
  {
    id: "feat-4",
    title: "Direct Chat & Pay",
    description: "Chat directly with tutors, plan syllabuses, and pay safely per lesson with zero mandatory recurring commitments.",
    iconType: "chat"
  }
];

export const EDUCATOR_CTA_DATA = {
  badge: "FOR QUALIFIED EDUCATORS",
  heading: "Teach students in your neighborhood.",
  subtext: "Set your own hourly rates, choose when and where you teach, and keep 100% of your earnings with zero hidden commissions.",
  primaryButtonText: "Start Tutoring →",
  secondaryButtonText: "How Earnings Work"
};

export const FOOTER_DATA = {
  navLinks: [
    { label: "About Us", href: "#about" },
    { label: "Safety Standards", href: "#safety" },
    { label: "Tutor Directory", href: "#directory" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" }
  ],
  serviceCoverage: "Serving London, Manchester, Birmingham & nearby districts.",
  copyright: "© 2026 TuitionPoint Marketplace Inc. All rights reserved."
};

export const BOTTOM_NAV_ITEMS = [
  { id: "explore", label: "Explore", icon: "explore", active: true },
  { id: "saved", label: "Saved", icon: "saved", active: false },
  { id: "bookings", label: "Bookings", icon: "bookings", active: false },
  { id: "inbox", label: "Inbox", icon: "inbox", active: false },
  { id: "profile", label: "Profile", icon: "profile", active: false }
];
