import React, { useState } from "react";
import { Sun, Moon, Menu, X, Cloud, User, Sparkles } from "lucide-react";
import { PageId, UserSession } from "../types";

interface NavbarProps {
  activePage: PageId;
  setActivePage: React.Dispatch<React.SetStateAction<PageId>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  session: UserSession;
  onLogout: () => void;
  openLoginModal: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  darkMode,
  setDarkMode,
  session,
  onLogout,
  openLoginModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home" as PageId, label: "Home" },
    { id: "transfer" as PageId, label: "Transfer" },
    { id: "contact" as PageId, label: "Contact Us" },
  ];

  const handleNavClick = (pageId: PageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`relative z-50 border-b transition-all duration-300 ${
        darkMode
          ? "bg-[#16161a]/90 border-gray-800 text-gray-200"
          : "bg-white/95 border-gray-200 text-gray-800"
      } backdrop-blur-md sticky top-0`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div
            id="brand-logo"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/10 group-hover:shadow-cyan-500/30 transition-all duration-300">
              <Cloud className="h-6 w-6 animate-pulse" />
              {/* Overlay double-arrow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[9px] font-black tracking-tighter text-cyan-200 mt-2 select-none">
                  ⇄
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Sendro
              </span>
              <span className="text-[10px] text-gray-400 leading-none font-medium">
                Share and Convert
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => (
              <button
                id={`nav-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                  activePage === item.id
                    ? darkMode
                      ? "text-cyan-400 bg-gray-800/60 font-bold"
                      : "text-blue-600 bg-gray-100 font-bold"
                    : "hover:text-cyan-400 dark:hover:text-cyan-400 text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.label}
                {activePage === item.id && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* User Controls & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                darkMode
                  ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-amber-400 hover:border-amber-400/50"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-sky-600 hover:border-sky-300"
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Profile / Login */}
            {session.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
                    darkMode
                      ? "bg-gray-800/40 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-400 max-w-[120px] truncate">
                    {session.displayName || session.email}
                  </span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full font-bold">
                    {session.tier}
                  </span>
                </div>
                <button
                  id="btn-logout"
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="btn-login-open"
                onClick={openLoginModal}
                className="flex items-center space-x-1.5 px-4.5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-cyan-500/10 cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>Log In</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              id="mobile-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-amber-400"
                  : "bg-gray-100 border-gray-200 text-sky-600"
              }`}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800/40 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className={`md:hidden border-t px-4 pt-2 pb-4 space-y-2 absolute w-full left-0 ${
            darkMode
              ? "bg-[#18181c] border-gray-800"
              : "bg-white border-gray-200"
          } shadow-xl`}
        >
          {navItems.map((item) => (
            <button
              id={`mobile-nav-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activePage === item.id
                  ? darkMode
                    ? "bg-gray-800 text-cyan-400"
                    : "bg-gray-100 text-blue-600 font-bold"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/40"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-[1px] bg-gray-800 my-2" />
          {session.isLoggedIn ? (
            <div className="pt-2 px-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 truncate">
                  {session.displayName || session.email}
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-bold">
                  {session.tier}
                </span>
              </div>
              <button
                id="mobile-btn-logout"
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-center py-2 text-sm font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              id="mobile-btn-login"
              onClick={() => {
                openLoginModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-1 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:scale-[1.01]"
            >
              <User className="h-4 w-4" />
              <span>Log In</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
