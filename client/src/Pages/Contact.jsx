import React, { useState } from 'react';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle 
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");
    const formData = new FormData(e.target);
    formData.append("access_key", "92f45adc-621c-449e-a9dd-1afe73c40773");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully");
        e.target.reset();
      } else {
        console.log("error details", data);
        setResult(data.message || "Error submitting form");
      }
    } catch (e) {
      console.error("Network Error:", e);
      setResult("Network error, please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-[#1A0505] text-[#E8DFD1] selection:bg-[#8C1515] selection:text-white font-sans antialiased"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <main className="grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* 1. PAGE HEADER */}
          <section className="text-center max-w-3xl mx-auto space-y-4 pt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8C1515]/30 border border-[#F3C97A]/30 text-[#F3C97A] font-mono text-[11px] uppercase tracking-[0.25em]">
              <span>Help & Support</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight">
              Get in <span className="italic font-normal text-[#F3C97A]">Touch</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#E8DFD1]/70 font-mono leading-relaxed max-w-xl mx-auto">
              Have an inquiry regarding a private drop, order status, or bespoke sizing? Our VIP concierge team is at your service.
            </p>
          </section>

          {/* 2. GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                {/* <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3C97A] block mb-2">
                  At Your Assistance
                </span> */}
                <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight">
                  We're Here to Help
                </h2>
                <p className="text-xs sm:text-sm text-[#E8DFD1]/70 leading-relaxed font-mono mt-3">
                  Our client advisors are available 24/7 to assist with authentication details, shipping logistics, and custom consultations.
                </p>
              </div>

              <div className="space-y-4">

                {/* Info Card: Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#250808]/60 border border-[#E8DFD1]/15 hover:border-[#F3C97A]/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#8C1515]/30 border border-[#F3C97A]/30 flex items-center justify-center text-[#F3C97A] shrink-0">
                    <FiMapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-white">Our Location</h3>
                    <p className="text-xs text-[#E8DFD1]/70 font-mono mt-1 leading-relaxed">
                      123 Commerce Avenue, Suite 400<br />
                      AK'S STORE
                    </p>
                  </div>
                </div>

                {/* Info Card: Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#250808]/60 border border-[#E8DFD1]/15 hover:border-[#F3C97A]/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#8C1515]/30 border border-[#F3C97A]/30 flex items-center justify-center text-[#F3C97A] shrink-0">
                    <FiPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-white">Land Line</h3>
                    <p className="text-xs text-[#E8DFD1]/70 font-mono mt-1 leading-relaxed">
                      Toll-Free: +1 (800) 123-4567<br />
                      Direct VIP: +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                {/* Info Card: Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#250808]/60 border border-[#E8DFD1]/15 hover:border-[#F3C97A]/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#8C1515]/30 border border-[#F3C97A]/30 flex items-center justify-center text-[#F3C97A] shrink-0">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-white">Email Us</h3>
                    <p className="text-xs text-[#E8DFD1]/70 font-mono mt-1 leading-relaxed">
                      support@akstore.com<br />
                      press@akstore.com
                    </p>
                  </div>
                </div>

                {/* Info Card: Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#250808]/60 border border-[#E8DFD1]/15 hover:border-[#F3C97A]/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#8C1515]/30 border border-[#F3C97A]/30 flex items-center justify-center text-[#F3C97A] shrink-0">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-white">Available Hours</h3>
                    <p className="text-xs text-[#E8DFD1]/70 font-mono mt-1 leading-relaxed">
                      24/7 Global Client Support
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-[#1A0505]/90 backdrop-blur-md rounded-2xl border border-[#E8DFD1]/15 p-6 sm:p-10 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3C97A] block mb-1">
                  // Send Inquiry
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  Send Us a Message
                </h3>
              </div>

              {/* Submission Feedback Banner */}
              {result && (
                <div className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
                  result === "Form Submitted Successfully"
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : result === "Sending..."
                    ? 'bg-[#8C1515]/40 border-[#F3C97A]/40 text-[#F3C97A]'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                }`}>
                  {result === "Form Submitted Successfully" ? (
                    <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : (
                    <FiAlertCircle className="h-4 w-4 shrink-0 text-[#F3C97A]" />
                  )}
                  <span>{result}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={onSubmit}>

                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono text-[#E8DFD1]/80 uppercase tracking-wider mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="first_name"
                      placeholder="Jane"
                      className="w-full px-4 py-3 bg-[#250808]/80 border border-[#E8DFD1]/20 rounded-xl text-xs sm:text-sm text-white placeholder-[#E8DFD1]/30 focus:outline-none focus:border-[#F3C97A] focus:ring-1 focus:ring-[#F3C97A] transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#E8DFD1]/80 uppercase tracking-wider mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="last_name"
                      placeholder="Doe"
                      className="w-full px-4 py-3 bg-[#250808]/80 border border-[#E8DFD1]/20 rounded-xl text-xs sm:text-sm text-white placeholder-[#E8DFD1]/30 focus:outline-none focus:border-[#F3C97A] focus:ring-1 focus:ring-[#F3C97A] transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-mono text-[#E8DFD1]/80 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 bg-[#250808]/80 border border-[#E8DFD1]/20 rounded-xl text-xs sm:text-sm text-white placeholder-[#E8DFD1]/30 focus:outline-none focus:border-[#F3C97A] focus:ring-1 focus:ring-[#F3C97A] transition-all font-mono"
                  />
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label className="block text-[11px] font-mono text-[#E8DFD1]/80 uppercase tracking-wider mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-[#250808] border border-[#E8DFD1]/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#F3C97A] focus:ring-1 focus:ring-[#F3C97A] transition-all cursor-pointer font-mono"
                  >
                    <option value="Order Status Inquiry" className="bg-[#1A0505]">Order Status Inquiry</option>
                    <option value="Returns & Exchanges" className="bg-[#1A0505]">Returns & Exchanges</option>
                    <option value="Product & Authentication Query" className="bg-[#1A0505]">Product & Authentication Query</option>
                    <option value="VIP Concierge Consultation" className="bg-[#1A0505]">VIP Concierge Consultation</option>
                    <option value="Other" className="bg-[#1A0505]">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono text-[#E8DFD1]/80 uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="How can our concierge team assist you today?"
                    className="w-full px-4 py-3 bg-[#250808]/80 border border-[#E8DFD1]/20 rounded-xl text-xs sm:text-sm text-white placeholder-[#E8DFD1]/30 focus:outline-none focus:border-[#F3C97A] focus:ring-1 focus:ring-[#F3C97A] transition-all resize-none font-mono"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  disabled={result === "Sending..."}
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-widest text-white bg-[#8C1515] hover:bg-[#a81a1a] border border-[#F3C97A]/30 shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                >
                  <span>{result === "Sending..." ? "Sending..." : "Send Message"}</span>
                  <FiSend className="h-4 w-4" />
                </button>

              </form>
            </div>

          </div>

        </div>
      </main>
    </motion.div>
  );
};

export default ContactPage;