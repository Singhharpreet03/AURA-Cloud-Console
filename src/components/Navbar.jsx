import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  LogIn, // Import LogIn icon
} from "lucide-react";
// Import useAuth
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Get user and logout from context
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/patch-management", label: "Patch Management" },
    { path: "/intelligent-alerts", label: "Intelligent Alerts" },
    { path: "/resource-monitor", label: "Resource Monitor" },
    { path: "/drift-management", label: "Drift Management" },
    { path: "/installation", label: "Installation" },
  ];

  const isActive = (path) => location.pathname === path;
  // Is Home IF path is "/" AND user is authenticated
  const isHome = isAuthenticated && location.pathname === "/";

  // Calculate user initials
  const initials = user
    ? user.fullName.split(" ").map((n) => n[0]).join("")
    : "JD"; // Default if no user

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login"); // Redirect to login page after logout
  };

  // New: handleNavClick will redirect unauthenticated users to /login preserving the target
  const handleNavClick = (e, path) => {
    if (!isAuthenticated) {
      // prevent the default Link navigation and redirect to login with from
      e.preventDefault();
      navigate("/login", { state: { from: { pathname: path } } });
      // close mobile menu if open
      setIsMobileMenuOpen(false);
    } else {
      // user is authenticated — allow Link default behavior
      // but close mobile menu if it was open
      setIsMobileMenuOpen(false);
    }
  };

  // BEST SOLID COLOR: Dark Navy Teal (#12283C)
  const NAVBAR_HOME_COLOR = "#12283C";
  const NAVBAR_OTHER_COLOR = "#123458";
  const BORDER_COLOR_HOME = "rgba(255, 255, 255, 0.1)";

  const navbarStyle = isHome
    ? {
        backgroundColor: NAVBAR_HOME_COLOR,
        borderBottom: `1px solid ${BORDER_COLOR_HOME}`,
      }
    : {
        backgroundColor: NAVBAR_OTHER_COLOR,
        borderColor: "#D4C9BE",
      };

  const userMenuBg = isHome ? "#1A324A" : "#FFFFFF";
  const userMenuTextColor = isHome ? "#D4C9BE" : "#1b1b1c"; // Adjust text color for white background

  return (
    <nav className="shadow-sm transition-colors duration-300" style={navbarStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* Make Home public: always point logo to "/" */}
            <Link to="/" className="flex items-center space-x-4">
              <img
                src="/logo.jpg"
                alt="AURA Logo"
                className="w-16 h-16"
                style={{ objectFit: "contain" }}
              />
              <div>
                <h1 className="text-xl font-bold" style={{ color: "#F1EFEC" }}>
                  AURA
                </h1>
                <span className="text-xs opacity-75" style={{ color: "#D4C9BE" }}>
                  Autonomous Unified Resource Agent
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - now show to everyone, but clicks enforce login */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path) ? "text-white" : "hover:bg-opacity-10 hover:bg-white"
                }`}
                style={{
                  color: isActive(item.path) ? "#F1EFEC" : "#D4C9BE",
                  backgroundColor: isActive(item.path)
                    ? "rgba(241, 239, 236, 0.1)"
                    : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Login Button */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10 hover:bg-white"
                  style={{ color: "#D4C9BE" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#D4C9BE" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "#1b1b1c" }}>
                      {initials}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50"
                    style={{ backgroundColor: userMenuBg }}
                  >
                    {/* User Info - Non-clickable, just for display */}
                    <div className="px-4 py-2 text-sm border-b border-white/10" style={{ color: userMenuTextColor }}>
                      <p className="font-bold">{user.fullName}</p>
                      <p className="text-xs opacity-75">{user.role}</p>
                    </div>

                    <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-white/10" style={{ color: "#4889c9ff" }}>
                      <User className="w-4 h-4 mr-3" />Profile
                    </a>
                    <Link
                      to="/policy-management"
                      className="flex items-center px-4 py-2 text-sm hover:bg-white/10"
                      style={{ color: "#4889c9ff" }}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4 mr-3" />Policy Management
                    </Link>

                    <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-white/10" style={{ color: "#4889c9ff" }}>
                      <Settings className="w-4 h-4 mr-3" />Settings
                    </a>
                    <hr className="my-1 border-white/10" />
                    {/* Use handleLogout function */}
                    <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-white/10">
                      <LogOut className="w-4 h-4 mr-3" />Sign Out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              // Login Button when not authenticated
              <Link
                to="/login"
                className="group px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#4889C9",
                  color: "#F1EFEC",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#5A9AD9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#4889C9";
                }}
              >
                Login
                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
                style={{ color: "#D4C9BE" }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - show to everyone, but clicks enforce login */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-opacity-20" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path) ? "text-white" : "hover:bg-opacity-10 hover:bg-white"
                  }`}
                  style={{
                    color: isActive(item.path) ? "#F1EFEC" : "#D4C9BE",
                    backgroundColor: isActive(item.path) ? "rgba(241, 239, 236, 0.1)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
