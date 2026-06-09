import React from "react";
import {
  ArrowRight,
  Shield,
  Zap,
  Calendar,
  Share2,
  FileText,
  Lock,
  Sparkles,
  Orbit,
} from "lucide-react";
import { PageId } from "../types";
import { motion } from "motion/react";

interface HomeViewProps {
  onStartTransfer: () => void;
  darkMode: boolean;
}

export default function HomeView({ onStartTransfer, darkMode }: HomeViewProps) {
  // Key benefits grid data
  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "Zero Limits, Maximum Speed",
      description:
        "Transfer high-resolution videos, large packages, and archives peer-to-peer at the absolute limit of your local bandwidth.",
    },
    {
      icon: <Lock className="h-6 w-6 text-cyan-400" />,
      title: "Fully Encrypted, Privately Kept",
      description:
        "Files are fully secured on storage. No logging, no analysis, just clean visual file sharing between target endpoints.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-400" />,
      title: "7-Day Automatic Expiry",
      description:
        "Any uploaded content is stored in a clean temporal state. Files are automatically cleared after 168 hours to maintain perfect privacy.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-emerald-400" />,
      title: "Effortless Retrieval Codes",
      description:
        "Forget complex link strings or registration requirements. Enter a simple, universal 6-digit numeric code on any device to retrieve content.",
    },
  ];

  return (
    <div
      id="home-view"
      className="relative overflow-hidden py-10 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Decorative Blur Spheres - background effects to make it attractive */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="h-3 w-3 animate-spin duration-3000" />
          <span>V2.0 Fully Temporal High-Speed Sharing</span>
        </motion.div>

        {/* Dynamic Display Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6"
        >
          <span className="block text-gray-900 dark:text-white leading-tight">
            Share Files Instantly.
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent leading-normal">
            No Registrations, Just Speed.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Transfer, drop any files, folders, or document archives here. Generate
          a secure, lightweight 6-digit retrieval code valid for exactly 7 days.
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center space-x-4 mb-20"
        >
          <button
            id="cta-start-transfer"
            onClick={onStartTransfer}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer text-base"
          >
            <span>Start Sharing Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* Animated Visual Placeholder Panel resembling Zapya Cloud Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-3xl mx-auto mb-24 rounded-3xl border border-gray-200/40 dark:border-gray-800/40 bg-white/5 dark:bg-gray-900/40 p-2 backdrop-blur-sm shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 rounded-3xl" />
          <div className="border border-gray-100/50 dark:border-gray-800/60 rounded-[22px] overflow-hidden p-6 sm:p-12 bg-white dark:bg-[#18181c]/90">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
              <div className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-800/20 transition-all duration-150">
                <div className="h-14 w-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 animate-bounce">
                  <FileText className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
                  1. Choose File
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
                  Drop any documents, compressed folders, photos or videos
                  directly.
                </p>
              </div>

              <div className="flex flex-col items-center">
                {/* Visual Connection Line */}
                <div className="relative w-full flex items-center justify-center my-2 md:my-0">
                  <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hidden md:block" />
                  <div className="absolute h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-md">
                    <Orbit className="h-5 w-5 text-blue-400 animate-spin" />
                  </div>
                </div>
                <span className="text-xs text-cyan-400 font-extrabold tracking-widest mt-4">
                  SYNCING
                </span>
              </div>

              <div className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-800/20 transition-all duration-150">
                <div className="h-14 w-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <div className="font-extrabold text-sm tracking-wider font-mono">
                    CODE
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
                  2. Copy & Retrieve
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
                  Your receiver gets a 6-digit code. Put it in on any phone or
                  laptop for instant download!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-12">
            Why Choose Sendro Transfer ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border ${
                  darkMode
                    ? "bg-[#18181c]/60 border-gray-800/60 hover:border-gray-700/80 hover:bg-gray-800/20"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                } transition-all duration-300`}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
