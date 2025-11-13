"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingStore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const settings = useSettingsStore((state) => state.settings);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      fetchSettings();
    }
  }, [settings, fetchSettings]);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const data = await res.json();
        setFormData({ name: "", phone: "", message: "" });

      } else {
        const errorData = await res.json();
        console.log(errorData)
      }
    } catch (ex) {
      console.error("Error submitting form:", ex);

    }finally{
      setSubmitted(false)
    }
  };




  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-10 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8 md:p-12"
      >
        {/* Left side - Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Have a question, project idea, or just want to say hello?
            We'd love to hear from you! Fill out the form or reach out directly.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-secondary w-6 h-6" />
              <p className="text-gray-700">{settings?.address || "Kathmandu Nepal"}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-secondary w-6 h-6" />
              <p className="text-gray-700">{settings?.email1 || "info@setnepal.com"}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-secondary w-6 h-6" />
              <p className="text-gray-700">{settings.phone1}, {settings.phone2}</p>
            </div>
          </div>
        </div>

        {/* Right side - Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col space-y-5 bg-white p-8 rounded-2xl shadow-md"
        >
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#d86d38]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Phone Number</label>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#d86d38]"
              placeholder="EG:- 9812345678"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#d86d38] resize-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(216,109,56,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-secondary text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {submitted ? "Message Sent " : "Send Message"}
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Decorative Background Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#d86d38]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/30 rounded-full blur-3xl animate-pulse" />
    </section>
  );
}
