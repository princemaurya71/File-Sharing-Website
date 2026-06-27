/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import TransferView from "./components/TransferView";
import ContactView from "./components/ContactView";
import LoginView from "./components/LoginView";
import { PageId, UserSession } from "./types";
import { AnimatePresence, motion } from "motion/react";
import { ShieldAlert, Sparkles, Cloud, Lock } from "lucide-react";

export default function App() {
  // Default page is "home" so user immediately sees their visual clone matching request
  const [activePage, setActivePage] = useState<PageId>("home");
  
  // Default theme is "dark, grayesh" (true)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved !== "light"; // Default is dark
  });

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [session, setSession] = useState<UserSession>({
    isLoggedIn: false,
    email: null,
    displayName: null,
    tier: "Free",
  });

  // Track the actual theme in DOM element to support dark classes correctly
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
  };

  const handleLogout = () => {
    setSession({
      isLoggedIn: false,
      email: null,
      displayName: null,
      tier: "Free",
    });
  };

  return (
    <div
      id="app-root"
      className={`min-h-screen relative flex flex-col transition-colors duration-300 font-sans ${
        darkMode ? "bg-[#121214] text-gray-100" : "bg-[#f8f9fa] text-gray-800"
      }`}
    >
      {/* Dynamic Animated background ambient grid to make it attractive and premium */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 opacity-[0.03] dark:opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]`}
        />
        {/* Subtle radial lights */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
      </div>

      {/* Navigation bar Header container */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        session={session}
        onLogout={handleLogout}
        openLoginModal={() => setShowLogin(true)}
      />

      {/* Main Pages section */}
      <main id="main-content-region" className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <HomeView onStartTransfer={() => setActivePage("transfer")} darkMode={darkMode} />
            </motion.div>
          )}

          {activePage === "transfer" && (
            <motion.div
              key="transfer-page"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <TransferView darkMode={darkMode} session={session} />
            </motion.div>
          )}

          {activePage === "contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ContactView darkMode={darkMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Elegant minimalist platform footer */}
      <footer
        id="app-footer"
        className={`border-t py-12 px-4 transition-colors duration-300 ${
          darkMode ? "bg-[#16161a] border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-500"
        } relative z-10`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-gray-900 dark:text-white mb-4">
              <Cloud className="h-5 w-5 text-cyan-500" />
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Sendro Transfer
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Transfer, drop any files, folders, or document archives here. Generate a secure, lightweight 6-digit retrieval code valid for exactly 7 days. No accounts, no storage fees, no permanent logs. Just simple, ephemeral file sharing.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Temporal Protocols
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <span className="h-1 w-1 bg-cyan-400 rounded-full shrink-0" />
                <span>6-Digit Verification Redemptions</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="h-1 w-1 bg-cyan-400 rounded-full shrink-0" />
                <span>7-Day Sandboxed Hold</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="h-1 w-1 bg-cyan-400 rounded-full shrink-0" />
                <span>Local Binary Cache Crypt</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Compliance & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5 text-amber-500 font-medium">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                <span>Auto Delete Executable</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>Zero Storage Server Logging</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-500">
            © 2026 Developed By Prince Maurya. No files are permanently archived. All rights reserved.
          </p>
          <div className="flex space-x-4 text-[10px]">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Not Ready"); }} className="hover:text-cyan-500">Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Local Storage limits depend on your browser cache allocation."); }} className="hover:text-cyan-500">Storage Terms</a>
          </div>
        </div>
      </footer>

      {/* Login workspace modal */}
      <AnimatePresence>
        {showLogin && (
          <LoginView
            darkMode={darkMode}
            onClose={() => setShowLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
