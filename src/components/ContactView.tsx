import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, Phone, ShieldCheck, Sparkles, Loader } from "lucide-react";
import { ContactFormData } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ContactViewProps {
  darkMode: boolean;
}

export default function ContactView({ darkMode }: ContactViewProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "File Sharing Support",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [prog, setProg] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus("sending");
    setProg(15);

    // Simulate complete visual upload progress checking standard with particles
    const interval = setInterval(() => {
      setProg((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("success");
          return 100;
        }
        const step = Math.floor(Math.random() * 20) + 10;
        return Math.min(100, prev + step);
      });
    }, 250);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "File Sharing Support",
      message: "",
    });
    setStatus("idle");
    setProg(0);
  };

  const contactOptions = [
    {
      icon: <Mail className="h-5 w-5 text-cyan-400" />,
      label: "Support Email",
      value: "mr.prince3650@gmail.com",
      desc: "Expect a response within 12-24 hours.",
    },
    {
      icon: <Phone className="h-5 w-5 text-blue-400" />,
      label: "Inquiries Desk",
      value: "+91 9167853886",
      desc: "",
    },
    {
      icon: <MapPin className="h-5 w-5 text-purple-400" />,
      label: "Location",
      value: "Mumbai, India",
      desc: "",
    },
  ];

  return (
    <div id="contact-view" className="relative py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Get in Touch with Sendro Support
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium">
          Have questions about your secure transfer, limit expansions, or file safety? Drop us a prompt message and our core team will assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Cards Side */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`p-6 rounded-2xl border ${
              darkMode ? "bg-[#18181c]/50 border-gray-800" : "bg-white border-gray-200 shadow-sm"
            } backdrop-blur-md`}
          >
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span>Direct Channels</span>
            </h3>
            
            <div className="space-y-6">
              {contactOptions.map((opt, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/20 text-gray-800">
                    {opt.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                      {opt.label}
                    </span>
                    <p className="font-bold text-gray-900 dark:text-white text-base mt-0.5">
                      {opt.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl border text-center ${
              darkMode ? "bg-[#18181c]/30 border-gray-800" : "bg-gray-100/50 border-gray-200"
            }`}
          >
            <Sparkles className="h-6 w-6 text-cyan-400 mx-auto mb-2 animate-pulse" />
            <span className="text-xs font-bold text-gray-900 dark:text-gray-300">
              Zero Storage Logging Policy
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
              Our file lockers handle transfers in memory and transient volumes. Any messages sent to our inbox are encrypted end-to-end.
            </p>
          </div>
        </div>

        {/* Contact Form Container Panel */}
        <div className="lg:col-span-7">
          <div
            className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
              darkMode
                ? "bg-[#18181c]/80 border-gray-800/80 shadow-2xl"
                : "bg-white border-gray-200 shadow-xl"
            } backdrop-blur-md`}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Prince Maurya"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 ${
                          darkMode ? "bg-gray-800/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="prince@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 ${
                          darkMode ? "bg-gray-800/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Topic of Interest
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 ${
                        darkMode ? "bg-gray-800 border-gray-700 text-cyan-400" : "bg-gray-50 border-gray-200 text-blue-600"
                      }`}
                    >
                      <option value="File Sharing Support">File Sharing Setup / Codes</option>
                      <option value="Account Limits">Pro Transfer Subscription</option>
                      <option value="File Expired Early">Expired File Recovery Inquiry</option>
                      <option value="Technical Bug">Report a Bug / Vulnerability</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="My uploaded files don't resolve on my Android browser..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 resize-none ${
                        darkMode ? "bg-gray-800/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </motion.form>
              )}

              {status === "sending" && (
                <motion.div
                  key="sending-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 px-6"
                >
                  <Loader className="h-10 w-10 text-cyan-400 animate-spin mb-4" />
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-lg mb-2">
                    Dispatching Secure Message
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
                    Connecting to support relay and saving data logs under temporal session nodes...
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-800/80 h-2 rounded-full overflow-hidden max-w-md">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-200"
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 mt-2">{prog}% Sent</span>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 px-6 text-center"
                >
                  <div className="h-16 w-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-2">
                    Message Dispatched!
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
                    Thank you, <span className="font-bold text-cyan-400">{formData.name}</span>! Our support team has queued your ticket. A confirmation email has been logged to <span className="font-semibold text-gray-800 dark:text-gray-200">{formData.email}</span>.
                  </p>

                  <button
                    id="contact-reset-btn"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
