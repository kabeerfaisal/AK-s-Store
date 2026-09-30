import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [result, setResult] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault()
    setResult("Sending...")
    const formData = new FormData(e.target)
    formData.append("access_key", "92f45adc-621c-449e-a9dd-1afe73c40773")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setResult("Form Submitted Successfully")
        e.target.reset()
      } else {
        console.log("error details", data)
        setResult(data.message || "Error");
      }
    } catch (e) {
      console.error("Network Error:", e);
      setResult("Network error, please try again.");
    }
  }




  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex flex-col bg-[#FAF8F5]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >

        <main className="flex-grow pt-16">

          {/* Page Header */}
          <div className="bg-gradient-to-b from-[#F3EFEA] to-[#FAF8F5] border-b border-[#E8DFD1] py-16 md:py-20 text-center">
            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-[#B45309] uppercase bg-[#FAF0D9] rounded-full border border-[#EAD196]">
                Support
              </span>
              <h1 className="text-4xl font-extrabold text-[#7A0C0C] tracking-tight mb-4">
                Get in <span className="text-[#8C1515]">Touch</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-stone-600">
                Have a question about a product, your order, or just want to say hi? We'd love to hear from you.
              </p>
            </div>
          </div>

          {/* Contact Content Container */}
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">

              {/* Left Column: Contact Information */}
              <div className="space-y-10 pr-0 lg:pr-10">
                <div>
                  <h2 className="text-3xl font-bold text-[#7A0C0C] mb-6">We're here to help</h2>
                  <div className="w-16 h-1 bg-[#D97706] mb-6 rounded-full"></div>
                  <p className="text-stone-600 leading-relaxed mb-8">
                    Our customer service team is available throughout the week to assist you. Drop us a message, and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Info Item */}
                  <div className="flex items-start group">
                    <div className="shrink-0 mt-1">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FAF0D9] text-[#8C1515] border border-[#EAD196] group-hover:scale-110 transition-transform duration-300">
                        <FiMapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-bold text-[#7A0C0C]">Headquarters</h3>
                      <p className="mt-2 text-stone-600 leading-relaxed">
                        123 Commerce Avenue<br />
                        Suite 400<br />
                        Portland, OR 97204
                      </p>
                    </div>
                  </div>

                  {/* Info Item */}
                  <div className="flex items-start group">
                    <div className="shrink-0 mt-1">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FAF0D9] text-[#8C1515] border border-[#EAD196] group-hover:scale-110 transition-transform duration-300">
                        <FiPhone className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-bold text-[#7A0C0C]">Phone Support</h3>
                      <p className="mt-2 text-stone-600">
                        Toll-Free: +1 (800) 123-4567<br />
                        Local: +1 (555) 987-6543
                      </p>
                    </div>
                  </div>

                  {/* Info Item */}
                  <div className="flex items-start group">
                    <div className="shrink-0 mt-1">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FAF0D9] text-[#8C1515] border border-[#EAD196] group-hover:scale-110 transition-transform duration-300">
                        <FiMail className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-bold text-[#7A0C0C]">Email Us</h3>
                      <p className="mt-2 text-stone-600">
                        support@akstore.com<br />
                        press@akstore.com
                      </p>
                    </div>
                  </div>

                  {/* Info Item */}
                  <div className="flex items-start group">
                    <div className="shrink-0 mt-1">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FAF0D9] text-[#8C1515] border border-[#EAD196] group-hover:scale-110 transition-transform duration-300">
                        <FiClock className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-bold text-[#7A0C0C]">Working Hours</h3>
                      <p className="mt-2 text-stone-600">
                        24/7 Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8DFD1] p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-[#7A0C0C] mb-6">Send us a message</h3>

                <form className="space-y-6" onSubmit={onSubmit}>

                  {/* Name Fields (Side by side on small+ screens) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        className="w-full px-4 py-3 bg-stone-50 border border-[#E8DFD1] rounded-lg text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:border-[#8C1515] transition-colors"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        className="w-full px-4 py-3 bg-stone-50 border border-[#E8DFD1] rounded-lg text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:border-[#8C1515] transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 bg-stone-50 border border-[#E8DFD1] rounded-lg text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:border-[#8C1515] transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-stone-700 mb-2">Subject</label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 bg-stone-50 border border-[#E8DFD1] rounded-lg text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:border-[#8C1515] transition-colors cursor-pointer"
                    >
                      <option>Order Status Inquiry</option>
                      <option>Returns & Exchanges</option>
                      <option>Product Question</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name='message'
                      rows="5"
                      className="w-full px-4 py-3 bg-stone-50 border border-[#E8DFD1] rounded-lg text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:border-[#8C1515] transition-colors resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                  disabled={result === "Sending..."}
                    type="submit"
                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-[#8C1515] hover:bg-[#680909] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C1515] transition-all duration-300"
                  >
                    {result === "Sending..." ? "Sending..." : "Send Message"} <FiSend className="ml-2 h-5 w-5" />
                  </button>

                </form>
              </div>

            </div>
          </div>

        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default ContactPage;