import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import FormInput from "../../components/auth/FormInput";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { ...formData };
      if (!payload.phone || !payload.phone.trim()) {
        delete payload.phone;
      } else {
        payload.phone = payload.phone.trim();
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.[0]?.msg || data.message || "Failed to register");
      }

      navigate("/auth/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join your local neighbourhood tutoring network"
    >
      {error && (
        <div className="mb-4 text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Toggle Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            I am joining as:
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "student" })}
              className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                formData.role === "student"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Student / Parent
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "teacher" })}
              className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                formData.role === "teacher"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tutor / Teacher
            </button>
          </div>
        </div>

        <FormInput
          label="Full Name"
          id="name"
          placeholder="e.g. John Doe"
          icon={User}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <FormInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="name@domain.com"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <FormInput
          label="Phone Number (10 digits)"
          id="phone"
          placeholder="9876543210"
          icon={Phone}
          required={false}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <FormInput
          label="Password (min 6 chars)"
          id="password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          <UserPlus size={16} />
          {loading ? "Registering..." : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Already registered?{" "}
        <Link to="/auth/login" className="font-semibold text-blue-600 hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}