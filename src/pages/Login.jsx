import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LogIn, User, Lock, ArrowRight } from "lucide-react";
import { useToast } from "../components/Toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 250)); // subtle UX delay
      const result = await login(username.trim(), password);

      if (result?.success) {
        const loggedUser = result.user || {};
        toast?.add?.({
          message: `Welcome back, ${loggedUser?.fullName || "User"}!`,
          type: "success",
        });
        navigate(from, { replace: true });
      } else {
        toast?.add?.({
          message: result?.error || "Login failed. Please check your credentials.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast?.add?.({
        message: "Something went wrong during login.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #071626 0%, #0f2b3b 50%, #12283C 100%)",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      <div className="w-full max-w-md mx-auto">
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,34,48,0.9), rgba(15,37,53,0.85))",
            border: "1px solid rgba(255,255,255,0.04)",
            padding: 28,
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(72,137,201,0.18), rgba(12,34,48,1))",
                border: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <img
                src="/logo.jpg"
                alt="AURA Logo"
                className="w-16 h-16"
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </div>

            <h2
              className="text-3xl font-extrabold text-center"
              style={{ color: "#F1EFEC", textShadow: "0 1px 0 rgba(0,0,0,0.35)" }}
            >
              Sign in to <span style={{ color: "#88BEE8" }}>AURA</span>
            </h2>

            {/* <p className="mt-2 text-sm text-center" style={{ color: "#C7D7E6" }}>
              Use one of the pre-set credentials (Password: 1111)
            </p> */}

            {location.state?.from?.pathname && (
              <p className="mt-2 text-xs text-center" style={{ color: "#7FA8CE" }}>
                You will be redirected to <strong>{location.state.from.pathname}</strong> after sign in
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden
                  >
                    <User className="w-5 h-5" style={{ color: "#9fb8d6" }} />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="block w-full pl-12 pr-3 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "rgba(12,36,48,0.5)",
                      border: "1px solid rgba(255,255,255,0.03)",
                      color: "#E8F3FA",
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden
                  >
                    <Lock className="w-5 h-5" style={{ color: "#9fb8d6" }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full pl-12 pr-3 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "rgba(12,36,48,0.5)",
                      border: "1px solid rgba(255,255,255,0.03)",
                      color: "#E8F3FA",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: isSubmitting ? "#3f7fb2" : "#4889C9",
                  color: "#F1EFEC",
                  boxShadow: isSubmitting ? "none" : "0 10px 30px rgba(72,137,201,0.18)",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = "#5A9AD9";
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = "#4889C9";
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-3 transition-transform" />
                  </span>
                )}
              </button>

              <div className="flex flex-col gap-2 w-36">
                <button
                  type="button"
                  className="py-2 px-3 rounded-lg text-sm font-medium border"
                  style={{
                    background: "transparent",
                    color: "#D4C9BE",
                    borderColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="py-2 px-3 rounded-lg text-sm font-medium"
                  style={{
                    background: "transparent",
                    color: "#A0C4E8",
                    border: "none",
                    textAlign: "center",
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <small style={{ color: "rgba(255,255,255,0.35)" }}>
              Need help? Contact your administrator.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
