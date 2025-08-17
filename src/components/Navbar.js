import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiUser,
  FiMail,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";

const ThemeToggle = () => {
  const { settings, updateSettings } = useSettings();

  // Determine current theme for display
  const getCurrentTheme = () => {
    if (settings.themeMode === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return settings.themeMode;
  };

  const currentTheme = getCurrentTheme();
  const isDarkMode = currentTheme === "dark";

  const toggleTheme = () => {
    if (settings.themeMode === "auto") {
      // If auto, switch to opposite of current system theme
      const systemIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      updateSettings({ themeMode: systemIsDark ? "light" : "dark" });
    } else {
      // Toggle between light and dark
      updateSettings({ themeMode: isDarkMode ? "light" : "dark" });
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
          : "bg-gray-700/20 text-gray-600 hover:bg-gray-700/30"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? "dark" : "light"}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { settings } = useSettings();

  // Determine current theme for styling
  const getCurrentTheme = () => {
    if (settings.themeMode === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return settings.themeMode;
  };

  const currentTheme = getCurrentTheme();
  const isDarkMode = currentTheme === "dark";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== "/"
          ? isDarkMode
            ? "glass-effect border-b border-white/10"
            : "bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {settings.logoUrl && (
              <motion.img
                src={settings.logoUrl}
                alt={settings.siteName || "Logo"}
                className={`${
                  settings.logoSize === "small"
                    ? "h-8"
                    : settings.logoSize === "large"
                    ? "h-12"
                    : "h-10"
                } w-auto object-contain`}
                whileHover={{ scale: 1.05 }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            {settings.showLogoText && (
              <span
                className={`font-bold text-xl ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } ${
                  settings.logoPosition === "center"
                    ? "text-center"
                    : settings.logoPosition === "right"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {settings.logoText || settings.siteName || "Portfolio"}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? isDarkMode
                      ? "text-primary-400"
                      : "text-primary-600"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400"
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-primary-500/20 text-primary-400 hover:bg-primary-500/30"
                      : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                  }`}
                >
                  <FiUser className="mr-1" size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  <FiLogOut className="mr-1" size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "bg-primary-500 text-white hover:bg-primary-600"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-white/10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${
              isDarkMode
                ? "bg-gray-900/95 backdrop-blur-lg border-t border-white/10"
                : "bg-white/95 backdrop-blur-lg border-t border-gray-200/50"
            }`}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors rounded-lg ${
                    location.pathname === item.path
                      ? isDarkMode
                        ? "text-primary-400 bg-primary-500/20"
                        : "text-primary-600 bg-primary-50"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <div className="pt-2 border-t border-gray-200/20">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isDarkMode
                        ? "text-primary-400 hover:bg-primary-500/20"
                        : "text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    <FiUser className="mr-2" size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isDarkMode
                        ? "text-red-400 hover:bg-red-500/20"
                        : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <FiLogOut className="mr-2" size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200/20">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors text-center ${
                      isDarkMode
                        ? "bg-primary-500 text-white hover:bg-primary-600"
                        : "bg-primary-600 text-white hover:bg-primary-700"
                    }`}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
