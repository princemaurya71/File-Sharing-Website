import React, { useState } from "react";
import { User, Lock, Mail, ChevronRight, X, AlertCircle, ShieldCheck, Sparkles, Key } from "lucide-react";
import { UserSession } from "../types";
import { motion } from "motion/react";

interface LoginViewProps {
  onLoginSuccess: (session: UserSession) => void;
  onClose: () => void;
  darkMode: boolean;
}

export default function LoginView({ onLoginSuccess, onClose, darkMode }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill out all operational fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    // Simulate database lookup delays
    setTimeout(() => {
      setLoading(false);
      const userSession: UserSession = {
        isLoggedIn: true,
        email: email,
        displayName: name || email.split("@")[0],
        tier: "Pro", // Logs straight into Pro tier for preview fun!
      };
      onLoginSuccess(userSession);
      onClose();
    }, 1200);
  };

  // Pre-fill quick demo credentials for testing convenience!
  const useDemoAccount = () => {
    setEmail("premium@sendro-transfer.demo");
    setPassword("123456");
    setName("Alpha Tester");
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay backdrop */}
      <div 
        id="login-overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
      />

      {/* Main Dialog Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        id="login-card"
        className={`relative z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
          darkMode
            ? "bg-[#18181c]/95 border-gray-800 text-gray-200 shadow-2xl shadow-cyan-500/5"
            : "bg-white border-gray-200 text-gray-800 shadow-2xl"
        }`}
      >
        {/* Head controls */}
        <button
          id="login-close-btn"
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${
            darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/10 mb-3">
            <Key className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {isSignUp ? "Create Pro Account" : "Access Member Space"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 max-w-xs mx-auto">
            {isSignUp 
              ? "Join Sendro Transfer to orchestrate persistent lockers." 
              : "Access direct download channels, logs, and up to 10GB shares."}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Display Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="login-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sendro Fanatic"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 ${
                    darkMode ? "bg-gray-800/40 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 ${
                  darkMode ? "bg-gray-800/40 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="login-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 ${
                  darkMode ? "bg-gray-800/40 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                }`}
              />
            </div>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="flex items-center justify-center space-x-2 w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:opacity-90 font-bold rounded-xl text-white shadow-lg text-sm cursor-pointer select-none transition-opacity duration-150"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Verifying Locker...</span>
              </span>
            ) : (
              <>
                <span>{isSignUp ? "Create Workspace Account" : "Open Workspace"}</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Mode Button */}
        <div className="mt-5 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
          <button
            id="login-demo-btn"
            onClick={useDemoAccount}
            className="inline-flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-400/10 hover:bg-cyan-400/15 px-3 py-1.5 rounded-xl transition duration-150 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fast Autofill Pro Account</span>
          </button>
        </div>

        {/* SignUp switch */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {isSignUp ? "Already registered?" : "New to Sendro Locker ?"}{" "}
            <button
              id="login-signup-toggle"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="font-bold text-cyan-400 hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In Instead" : "Sign Up For Pro Free"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
