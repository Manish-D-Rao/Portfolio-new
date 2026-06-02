import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  History,
  Mail,
} from "lucide-react";
import { PERSONAL_INFO } from "../data.js";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null); // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [serverInquiries, setServerInquiries] = useState([]);

  // Fetch registered messages on mount
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setServerInquiries(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setResponseStatus("error");
      setStatusMessage(
        "Please populate all necessary validation markers (Name, Email, Message).",
      );
      return;
    }

    setLoading(true);
    setResponseStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setResponseStatus("success");
        setStatusMessage(result.message || "Message Sent! Thank You!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Refresh inquiries list
        fetchMessages();
      } else {
        setResponseStatus("error");
        setStatusMessage(
          result.error || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      setResponseStatus("error");
      setStatusMessage("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 bg-zinc-950/20 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient neon flare */}
      <div className="absolute bottom-0 right-1/4 w-87.5 h-87.5 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center sm:text-left">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Let's build a connection
          </h2>
          <div className="h-0.5 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mt-4 mx-auto sm:mx-0" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Glassmorphic Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-zinc-950/90 border border-white/10 rounded-2xl relative shadow-2xl">
              {/* Form Window header mockup */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-400 tracking-wide lowercase">
                    connection_gateway
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold animate-pulse">
                  ready_to_send
                </span>
              </div>

              {/* Real submission feedback triggers */}
              <AnimatePresence>
                {responseStatus && (
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.98, opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl mb-6 flex gap-3 items-start border ${
                      responseStatus === "success"
                        ? "bg-green-500/10 border-green-500/20 text-green-300"
                        : "bg-red-500/10 border-red-500/20 text-red-300"
                    }`}
                  >
                    {responseStatus === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm font-sans leading-normal">
                      {statusMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Node */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="form-name"
                      className="font-mono text-[10px] uppercase text-slate-500 tracking-wider font-bold"
                    >
                      Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Roosevelt"
                      className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none focus:bg-zinc-900/90 text-sm font-sans text-white transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="form-email"
                      className="font-mono text-[10px] uppercase text-slate-500 tracking-wider font-bold"
                    >
                      Email address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. eleanor@whitehouse.gov"
                      className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none focus:bg-zinc-900/90 text-sm font-sans text-white transition-all"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="form-subject"
                    className="font-mono text-[10px] uppercase text-slate-500 tracking-wider font-bold"
                  >
                    Subject
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Collaboration Proposal on React Architecture"
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none focus:bg-zinc-900/90 text-sm font-sans text-white transition-all"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="form-message"
                    className="font-mono text-[10px] uppercase text-slate-500 tracking-wider font-bold"
                  >
                    Transmission body <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your connection transmission details here..."
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3.5 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none focus:bg-zinc-900/90 text-sm font-sans text-white transition-all resize-none"
                  />
                </div>

                {/* Submit button bar */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-zinc-600 select-none">
                    * REQUIRED ENCLOSURE MARKERS
                  </span>

                  <button
                    id="contact-button"
                    type="submit"
                    disabled={loading}
                    className="group px-6 py-3 bg-white text-black font-sans text-xs font-bold uppercase rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "SENDING....." : "SEND MESSAGE"}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: In-Memory Message Monitor Activity */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <h3 className="font-display text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Coordinates</span>
              </h3>

              <ul className="flex flex-col gap-3 font-sans text-xs text-slate-400">
                <li className="flex items-center gap-4 py-1.5 border-b border-white/5">
                  <span className="font-mono text-[10px] uppercase text-slate-500 w-16">
                    EMAIL
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    className="text-slate-200 hover:text-cyan-450 transition-colors"
                  >
                    {PERSONAL_INFO.socials.email}
                  </a>
                </li>
                <li className="flex items-center gap-4 py-1.5 border-b border-white/5">
                  <span className="font-mono text-[10px] uppercase text-slate-500 w-16">
                    GITHUB
                  </span>
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-cyan-450 transition-colors"
                  >
                    {PERSONAL_INFO.socials.github}
                  </a>
                </li>
                <li className="flex items-center gap-4 py-1.5 border-b border-white/5">
                  <span className="font-mono text-[10px] uppercase text-slate-500 w-16">
                    LINKEDIN
                  </span>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-cyan-450 transition-colors"
                  >
                    {PERSONAL_INFO.socials.linkedin}
                  </a>
                </li>
                <li className="flex items-center gap-4 py-1.5">
                  <span className="font-mono text-[10px] uppercase text-slate-500 w-16">
                    LOCATION
                  </span>
                  <span className="text-slate-200">Karnataka, India</span>
                </li>
              </ul>
            </div>

            {/* In-Memory database activity panel */}
            <div className="p-6 bg-zinc-950/90 border border-white/10 rounded-2xl grow shadow-lg">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-400" />
                  <span>Real-time Message Logs</span>
                </h3>

                <span className="font-mono text-[10px] bg-purple-950/30 border border-purple-500/10 text-purple-400 rounded px-1.5 py-0.5">
                  {serverInquiries.length} Active
                </span>
              </div>

              {/* Scrollable message stack */}
              <div className="max-h-56 overflow-y-auto flex flex-col gap-3 pr-1">
                {serverInquiries.length === 0 ? (
                  <div className="text-center py-6 text-zinc-600 font-mono text-xs">
                    0 Message Buffers
                  </div>
                ) : (
                  [...serverInquiries].reverse().map((msg, index) => (
                    <div
                      key={msg.id}
                      className="p-3.5 bg-zinc-900 border border-white/5 rounded-xl flex flex-col gap-1.5 text-xs hover:border-purple-500/20 transition-all group"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="font-display font-bold text-slate-300 uppercase group-hover:text-purple-400 transition-colors">
                          {msg.name}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-500">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="font-serif italic text-slate-400 text-[11px] leading-relaxed wrap-break-word font-light">
                        "{msg.message}"
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1 border-t border-white/5 border-dashed">
                        <span className="font-mono truncate max-w-37.5">
                          {msg.email}
                        </span>
                        <span className="font-mono uppercase font-bold text-purple-500 tracking-wider">
                          INDEX {serverInquiries.length - index}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
