import React from 'react';
import { FiTarget, FiHeart, FiShield, FiGlobe } from 'react-icons/fi';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const teamMembers = [
    { id: 1, name: 'Sarah Jenkins', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'David Chen', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Maya Patel', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Marcus Johnson', role: 'Customer Success', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  const values = [
    { icon: <FiHeart className="h-6 w-6" />, title: 'Customer First', desc: 'We design every experience with our customers in mind, ensuring satisfaction at every step.' },
    { icon: <FiTarget className="h-6 w-6" />, title: 'High Quality', desc: 'We source only the finest materials, partnering with ethical manufacturers around the globe.' },
    { icon: <FiShield className="h-6 w-6" />, title: 'Secure & Reliable', desc: 'Your data and payments are protected with industry-leading encryption and security standards.' },
    { icon: <FiGlobe className="h-6 w-6" />, title: 'Sustainable', desc: 'We are committed to reducing our carbon footprint through eco-friendly packaging and shipping.' },
  ];

  return (
    <>
    <Navbar />
    <motion.div 
      className="min-h-screen flex flex-col bg-[#FAF8F5]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

      <main className="grow pt-16">
        
        {/* 1. Hero / Mission Section */}
        <div className="bg-gradient-to-b from-[#F3EFEA] to-[#FAF8F5] border-b border-[#E8DFD1] py-20 md:py-28">
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-[#B45309] uppercase bg-[#FAF0D9] rounded-full border border-[#EAD196]">
              Our Mission
            </span>
            <h1 className="text-4xl font-extrabold text-[#7A0C0C] sm:text-5xl tracking-tight mb-6">
              Making Everyday Life <span className="text-[#8C1515]">Exceptional</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-stone-600 mb-6 leading-relaxed">
              We believe that shopping for your favorite lifestyle products should be effortless, inspiring, and accessible to everyone.
            </p>
          </div>
        </div>

        {/* 2. Our Story Section */}
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg border border-[#E8DFD1]">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Our team collaborating in a bright office" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-[#7A0C0C] tracking-tight">Our Story</h2>
              <p className="text-base text-stone-600 leading-relaxed">
                Founded in 2023, LumiStore began with a simple idea: high-quality products shouldn't come with exorbitant price tags. We started in a small garage in Portland, curating a handful of minimalist accessories.
              </p>
              <p className="text-base text-stone-600 leading-relaxed">
                Today, we've grown into a global brand serving over 100,000 happy customers. Despite our growth, our core philosophy remains unchanged. We cut out the middlemen, design with intention, and deliver directly to your door.
              </p>
              
              {/* Stats Counters */}
              <div className="pt-4 flex space-x-8 border-t border-[#E8DFD1]">
                <div>
                  <h4 className="text-3xl font-extrabold text-[#8C1515]">100k+</h4>
                  <p className="text-sm text-stone-500 font-medium mt-1">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-[#8C1515]">4.9/5</h4>
                  <p className="text-sm text-stone-500 font-medium mt-1">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Core Values Grid */}
        <div className="bg-[#F3EFEA] border-y border-[#E8DFD1] py-16 md:py-24">
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#7A0C0C] tracking-tight">Our Core Values</h2>
              <div className="w-16 h-1 bg-[#D97706] mx-auto mt-2 rounded-full mb-3"></div>
              <p className="text-base text-stone-600 max-w-2xl mx-auto">The principles that guide everything we do, from product design to customer support.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-[#E8DFD1] hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[#FAF0D9] text-[#8C1515] rounded-xl border border-[#EAD196] flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">{value.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. The Team Section */}
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#7A0C0C] tracking-tight">Meet the Team</h2>
            <div className="w-16 h-1 bg-[#D97706] mx-auto mt-2 rounded-full mb-3"></div>
            <p className="text-base text-stone-600 max-w-2xl mx-auto">The passionate people working hard behind the scenes to bring you the best products.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="group text-center">
                <div className="relative w-44 h-44 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-md group-hover:border-[#8C1515] transition-all duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-stone-800">{member.name}</h3>
                <p className="text-[#8C1515] font-semibold text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </motion.div>
    </>
  );
};

export default AboutPage;