import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import FormInput from "../../components/auth/FormInput";
import { useAuth } from "../../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.errors?.[0]?.msg || "Invalid credentials");
      }

      // Immediately update AuthContext so Navbar etc. react without a page refresh
      setUser(data.user);

      // Route based on role
      if (data.user?.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to track sessions and manage tutoring requests"
    >
      {error && (
        <div className="mb-4 text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email address"
          id="email"
          type="email"
          placeholder="name@domain.com"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
              Password
            </label>
            <Link to="/auth/login/forgot-password"
              className="text-[11px] font-semibold text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-white">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={16} />
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full py-2.5 pl-9 pr-3 text-xs sm:text-sm bg-transparent placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          <LogIn size={16} />
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Don't have an account?{" "}
        <Link to="/auth/register" className="font-semibold text-blue-600 hover:underline">
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
}
