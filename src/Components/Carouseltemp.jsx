import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiShoppingCart } from 'react-icons/fi';


// Slide data — move this above the component, or pull from a CMS/props later
const heroSlides = [
    {
        tag: "Up to 50% off",
        headline: "Summer finds,\nhalf the price.",
        copy: "Every piece is secondhand and one of a kind — new arrivals up to 50% off this week.",
        cta: "Shop now",
        link: "/shop",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        tag: "Deal of the week",
        headline: "Outerwear,\nunder $25.",
        copy: "Jackets and coats marked down for the season — while sizes last.",
        cta: "Shop the sale",
        link: "/shop?category=outerwear",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        tag: "Just dropped",
        headline: "New denim,\njust in.",
        copy: "Fresh racks of vintage and modern denim, hand-picked this week.",
        cta: "Browse denim",
        link: "/shop?category=denim",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
];

// Component — place above or below your main export
function HeroCarousel() {
    const [index, setIndex] = useState(0);
    const [isPaused, setPaused] = useState(false);

useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500); // changes every 4.5s
    return () => clearInterval(timer);
}, [isPaused, heroSlides.length]);
    return (
        <>
<div
    className="relative min-h-[520px] h-[90vh] max-h-[750px] w-full overflow-hidden bg-[#1A0505] text-white border-b border-[#E8DFD1]/20 select-none"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
>
    {/* Background Image Carousel with Cinematic Dark Vignette */}
    <AnimatePresence mode="wait">
        <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <img
                src={heroSlides[index].image}
                alt={heroSlides[index].headline.replace('\n', ' ')}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
            />
            
            {/* Multi-layered dark vignette for high contrast readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0505] via-[#1A0505]/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0505]/90 via-[#1A0505]/40 to-transparent" />
        </motion.div>
    </AnimatePresence>

    {/* Main Content: Glassmorphic Editorial Card */}
    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 sm:pb-16 md:pb-20 z-10">
        <div className="max-w-xl p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#1A0505]/85 backdrop-blur-md border border-[#E8DFD1]/15 shadow-2xl">
            {/* Category / Drop Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F3C97A]/10 border border-[#F3C97A]/30 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F3C97A] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F3C97A]">
                    {heroSlides[index].tag}
                </span>
            </div>

            {/* Headline — Scaled for small mobile viewports */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white leading-[1.15] mb-5 sm:mb-6 whitespace-pre-line">
                {heroSlides[index].headline}
            </h1>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-3">
                <Link
                    to={heroSlides[index].link}
                    className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase text-white bg-[#8C1515] hover:bg-[#680909] active:scale-95 transition-all duration-200 border border-[#F3C97A]/20 shadow-lg shadow-[#8C1515]/40 focus:outline-none focus:ring-2 focus:ring-[#F3C97A]"
                >
                    <span>{heroSlides[index].cta}</span>
                    <FiArrowRight className="text-sm sm:text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>

                <div className="text-[10px] sm:text-xs font-mono text-[#E8DFD1]/60 tracking-widest uppercase">
                    0{index + 1} / 0{heroSlides.length}
                </div>
            </div>
        </div>
    </div>

    {/* Responsive Switcher Controls — Positioned cleanly with zero overlap */}
    <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 lg:right-8 z-20 flex items-center gap-1 sm:gap-1.5 bg-[#1A0505]/90 backdrop-blur-md p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-[#E8DFD1]/20 shadow-2xl max-w-[calc(100vw-24px)] overflow-x-auto">
        {heroSlides.map((slide, i) => (
            <button
                key={i}
                onClick={() => setIndex(i)}
                className={`group relative px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono transition-all duration-300 flex items-center gap-1.5 focus:outline-none shrink-0 ${
                    i === index
                        ? 'bg-[#8C1515] text-white border border-[#F3C97A]/40 shadow-md'
                        : 'text-[#E8DFD1]/60 hover:text-white hover:bg-white/5'
                }`}
                aria-label={`Go to slide ${i + 1}`}
            >
                <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${i === index ? 'bg-[#F3C97A] animate-pulse' : 'bg-transparent'}`} />
                <span>0{i + 1}</span>
                <span className="hidden md:inline uppercase text-[10px] tracking-wider opacity-80 max-w-[90px] truncate">
                    {slide.tag}
                </span>
            </button>
        ))}
    </div>
</div>
        </>
    )
}

export default HeroCarousel