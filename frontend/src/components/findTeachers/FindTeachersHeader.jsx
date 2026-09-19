import { MapPin, ShieldCheck } from "lucide-react";

export default function FindTeachersHeader({ locationName, radius }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Status */}
        <div className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-600">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">
            <ShieldCheck size={15} />
          </span>

          <span>Verified teachers near you</span>
        </div>

        {/* Heading */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Find the right teacher,
            <span className="text-blue-600"> near you.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Discover teachers based on your location, subjects, teaching mode,
            experience, and budget.
          </p>
        </div>

        {/* Location indicator */}
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-600">
            <MapPin size={16} className="text-blue-600" />

            <span>
              {locationName || "Your current location"}
            </span>
          </div>

          <span className="text-slate-400">
            Searching within {radius} km
          </span>
        </div>
      </div>
    </section>
  );
}