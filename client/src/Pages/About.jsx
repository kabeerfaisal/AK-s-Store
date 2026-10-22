import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiAward, 
  FiGlobe, 
  FiTruck, 
  FiArrowRight,
} from 'react-icons/fi';
import { TbShieldCheckFilled, TbSparkles } from "react-icons/tb";

const AboutPage = () => {
  const luxuryPillars = [
    {
      icon: <TbShieldCheckFilled className="h-5 w-5" />,
      title: '100% Authentic',
      desc: 'Every item undergoes a multi-point inspection by certified luxury authenticators before entering our archive.'
    },
    {
      icon: <FiAward className="h-5 w-5" />,
      title: 'Curated Excellence',
      desc: 'Handpicked global selections across rare leather goods, footwear, jewelry, and high-fashion apparel.'
    },
    {
      icon: <FiGlobe className="h-5 w-5" />,
      title: 'Global Sourcing',
      desc: 'Direct partnerships with ethical vintage collectors and luxury houses across Paris, Milan, and Tokyo.'
    },
    {
      icon: <FiTruck className="h-5 w-5" />,
      title: 'White-Glove Shipping',
      desc: 'Dispatched in custom protective signature packaging with fully insured priority global tracking.'
    }
  ];

  const teamMembers = [
    { id: 1, name: 'Alexander K.', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Elena Rostova', role: 'Head of Authentication', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Marcus Vance', role: 'Lead Archivist', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Sophia Chen', role: 'VIP Concierge Relations', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80' }
  ];

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-[#1A0505] text-[#E8DFD1] selection:bg-[#8C1515] selection:text-white font-sans antialiased"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <main className="grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
          
          {/* HERO SECTION */}
          <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8C1515]/30 border border-[#F3C97A]/30 text-[#F3C97A] font-mono text-[11px] uppercase tracking-[0.25em]"
            >
              <span>The Heritage & Story</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.15]"
            >
              Redefining Luxury & <br />
              <span className="italic font-normal text-[#F3C97A]">Timeless Elegance</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-[#E8DFD1]/70 leading-relaxed font-mono max-w-2xl mx-auto"
            >
              AK'S STORE was founded with a singular vision: to curate rare, high-craftsmanship apparel, footwear, and accessories for connoisseurs of understated luxury.
            </motion.p>
          </section>

          {/* BRAND STORY */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-y border-[#E8DFD1]/15 py-16 sm:py-20">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3C97A] block">
                Artisanal Curation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight leading-snug">
                Where Heritage Meets Modern Craftsmanship
              </h2>
              <p className="text-xs sm:text-sm text-[#E8DFD1]/80 leading-relaxed font-sans">
                Every item in our storefront is hand-selected and meticulously authenticated. From limited vintage drops to modern luxury silhouettes, we bridge the gap between historic craftsmanship and contemporary high-street fashion.
              </p>
              <p className="text-xs sm:text-sm text-[#E8DFD1]/60 leading-relaxed font-mono">
                We believe luxury shouldn't feel mass-produced. That is why our collections consist of rare 1-of-1 drops and limited runs crafted from the world's finest textiles and raw materials.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-[#E8DFD1]/20 bg-[#250808] relative group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" 
                  alt="AK'S STORE Showroom" 
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1A0505] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono text-[#F3C97A] uppercase tracking-widest block mb-1">
                    [ Archive Vault ]
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 font-serif italic">
                    "Quality is remembered long after price is forgotten."
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* CORE LUXURY PILLARS */}
          <section className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3C97A]">
                Our Promise
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                The Pillars of AK'S STORE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryPillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#1A0505]/80 backdrop-blur-md p-6 rounded-2xl border border-[#E8DFD1]/15 hover:border-[#F3C97A]/50 transition-all duration-300 space-y-4 shadow-lg hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8C1515]/30 border border-[#F3C97A]/30 flex items-center justify-center text-[#F3C97A]">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-lg text-white">{pillar.title}</h3>
                  <p className="text-xs text-[#E8DFD1]/70 leading-relaxed font-mono">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* STATS COUNTER SECTION */}
          <section className="bg-[#250808]/60 rounded-2xl border border-[#E8DFD1]/15 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#E8DFD1]/15">
              <div className="space-y-1">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F3C97A]">100k+</div>
                <div className="text-[11px] font-mono uppercase text-[#E8DFD1]/60 tracking-wider">Satisfied Clients</div>
              </div>
              <div className="space-y-1 pt-6 lg:pt-0">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F3C97A]">4.9 / 5</div>
                <div className="text-[11px] font-mono uppercase text-[#E8DFD1]/60 tracking-wider">Client Rating</div>
              </div>
              <div className="space-y-1 pt-6 lg:pt-0">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F3C97A]">40+</div>
                <div className="text-[11px] font-mono uppercase text-[#E8DFD1]/60 tracking-wider">Countries Shipped</div>
              </div>
              <div className="space-y-1 pt-6 lg:pt-0">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F3C97A]">24/7</div>
                <div className="text-[11px] font-mono uppercase text-[#E8DFD1]/60 tracking-wider">VIP Concierge</div>
              </div>
            </div>
          </section>

          {/* MEET THE TEAM */}
          <section className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3C97A]">
                Behind The Vault
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                Meet Our Curators
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="group text-center space-y-3">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto overflow-hidden rounded-full border-2 border-[#E8DFD1]/20 group-hover:border-[#F3C97A] transition-all duration-500 shadow-xl">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white group-hover:text-[#F3C97A] transition-colors">{member.name}</h3>
                    <p className="text-[#F3C97A]/80 font-mono text-xs mt-0.5">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CALL TO ACTION */}
          <section className="text-center bg-linear-to-b from-[#8C1515]/20 to-[#1A0505] p-10 sm:p-16 rounded-3xl border border-[#8C1515]/40 space-y-6 shadow-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
              Ready to Explore the Archive?
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DFD1]/70 font-mono max-w-lg mx-auto">
              Discover our newest arrivals and limited drops before they are sold out.
            </p>
            <div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#8C1515] hover:bg-[#a81a1a] text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-xl border border-[#F3C97A]/30 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Explore Collection</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

        </div>
      </main>
    </motion.div>
  );
};

export default AboutPage;