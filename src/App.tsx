/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

// 1. Array updated to match your photos & background colors!
const IMAGES = [
  { src: '/ChatGPT_Image_May_29__2026__07_57_42_AM-removebg-preview.png', bg: '#BBAFA3' }, // Beige/Tan Puffer
  { src: '/ChatGPT_Image_May_29__2026__08_10_31_AM-removebg-preview.png', bg: '#121212' }, // Black Shiny Jacket (Near Black)
  { src: '/ChatGPT_Image_May_29__2026__08_10_46_AM-removebg-preview.png', bg: '#2A2B2E' }, // Black Matte Tactical (Dark Grey)
  { src: '/ChatGPT_Image_May_29__2026__08_11_16_AM-removebg-preview.png', bg: '#9CA3AF' }, // White Jacket (Light Gray to keep white text visible)
];

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = Math.floor(latest * 4);
    if (newIndex >= 4) newIndex = 3;
    if (newIndex < 0) newIndex = 0;
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  // Resize listener for mobile responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload images on mount
  useEffect(() => {
    IMAGES.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          backgroundColor: IMAGES[activeIndex].bg,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="relative w-full h-screen overflow-hidden">
        
        {/* 1. Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* 2. Giant ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
          style={{ top: '18%' }}
        >
          <h1
            className="text-white uppercase whitespace-nowrap opacity-100"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            RECYCLED
          </h1>
        </div>

        {/* 3. Top-left brand label */}
        <div className="absolute top-6 left-4 sm:left-8 z-[60]">
          <span className="text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]">
            KALU PUTIC
          </span>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0 z-[3]">
          {IMAGES.map((img, index) => {
            // Determine role dynamically based on activeIndex
            const isCenter = index === activeIndex;
            const isLeft = index === (activeIndex + 3) % 4;
            const isRight = index === (activeIndex + 1) % 4;
            const isBack = index === (activeIndex + 2) % 4;

            let transform = '';
            let filter = '';
            let opacity = 0;
            let zIndex = 0;
            let left = '';
            let top = '';
            let height = '';

            if (isCenter) {
              transform = `translate(-50%, -50%) scale(${isMobile ? 1.6 : 2.4})`;
              filter = 'blur(0px)';
              opacity = 1;
              zIndex = 20;
              left = '50%';
              top = '50%';
              height = isMobile ? '70%' : '85%';
            } else if (isLeft) {
              transform = 'translate(-50%, -50%) scale(1)';
              filter = 'blur(2px)';
              opacity = 0.85;
              zIndex = 10;
              left = isMobile ? '20%' : '25%';
              top = '50%';
              height = isMobile ? '16%' : '28%';
            } else if (isRight) {
              transform = 'translate(-50%, -50%) scale(1)';
              filter = 'blur(2px)';
              opacity = 0.85;
              zIndex = 10;
              left = isMobile ? '80%' : '75%';
              top = '50%';
              height = isMobile ? '16%' : '28%';
            } else if (isBack) {
              transform = 'translate(-50%, -50%) scale(1)';
              filter = 'blur(4px)';
              opacity = 1;
              zIndex = 5;
              left = '50%';
              top = '50%';
              height = isMobile ? '13%' : '22%';
            }

            return (
              <div
                key={index}
                className="absolute transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  transform,
                  filter,
                  opacity,
                  zIndex,
                  left,
                  top,
                  height,
                  aspectRatio: '0.6 / 1',
                  willChange: 'transform, filter, opacity, left, top',
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                  }}
                >
                  <img
                    src={img.src}
                    alt={`Character ${index + 1}`}
                    draggable={false}
                    className="w-full h-full object-contain object-center drop-shadow-2xl"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-16 z-[70] max-w-[320px]">
          <p className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white opacity-95 tracking-[0.02em] drop-shadow-md">
            KALU PUTIC FASHION
          </p>
          <p className="hidden sm:block text-xs sm:text-sm text-white opacity-90 leading-[1.6] mb-4 sm:mb-5 drop-shadow-md">
            An Ethiopian fashion creative who turns discarded, worn-out clothes into bold, original style. No big budget. No studio. Just vision, scissors, and passion.
          </p>
        </div>

        {/* 6. Bottom-right link */}
        <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-[60]">
          <a
            href="#about"
            className="flex items-center gap-2 text-white opacity-95 hover:opacity-100 transition-opacity duration-200 no-underline uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            EXPLORE
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default function App() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-[#121212] min-h-screen font-['Inter'] overflow-clip">
      <HeroSection />

      {/* Sections Wrapper in Technical Slate Blue */}
      <div id="about" className="bg-[#7a8b99] text-white relative z-10 w-full selection:bg-white selection:text-[#7a8b99] border-t border-[#7a8b99]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
          
          {/* Top Meta Bar */}
          <div className="flex justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-80 mb-20 sm:mb-32">
            <span>[ FRZN UX INIT_01 ]</span>
            <span className="text-right">UI CALIBRATED FOR<br/>BOLD INTERACTION -<br/>ZERO DISTRACTION,<br/>FULL FOCUS ON<br/>SUSTAINABLE ART.</span>
          </div>

          {/* About Me -> "FOR USERS, NOT VIEWERS" style */}
          <motion.section {...fadeInUp} className="mb-24 sm:mb-32 flex flex-col items-start gap-12">
            <h2 className="text-[4.5rem] sm:text-[9rem] lg:text-[11rem] font-['Anton'] leading-[0.85] tracking-tight uppercase sm:-ml-2">
              FOR USERS,<br/>NOT VIEWERS
            </h2>
            <div className="font-mono text-[10px] sm:text-xs opacity-70 uppercase leading-[1.8] tracking-[0.1em] self-end max-w-sm text-right mt-0 sm:-mt-20 pr-0 sm:pr-8 z-10 relative">
              <span className="block mb-4 border-b border-white/20 pb-4">[ KALU PUTIC — ETHIOPIAN CREATIVE ]</span>
              TURNS DISCARDED, WORN-OUT CLOTHES INTO BOLD, ORIGINAL STYLE. NO BIG BUDGET. NO STUDIO. JUST VISION, SCISSORS, AND PASSION. WHAT STARTED IN THE STREETS OF ETHIOPIA IS NOW REACHING MILLIONS.
            </div>
          </motion.section>

          {/* Social / Quotes (Middle section) */}
          <motion.section {...fadeInUp} className="mb-24 sm:mb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 relative border-t border-white/20 pt-12 sm:pt-20">
            <div className="lg:col-span-4 font-mono text-[9px] sm:text-[10px] uppercase opacity-70 tracking-[0.15em] space-y-2">
               <p>[ SUSTAINABLE ]</p>
               <p>[ UPCYCLED FABRIC ]</p>
               <p>[ RAW MATERIALS ]</p>
               <p>[ ETHIOPIAN ROOTS ]</p>
               <div className="pt-8 text-white opacity-100 font-bold border-t border-white/20 mt-8 w-24"></div>
               <p className="text-white opacity-100 font-bold text-xs uppercase tracking-widest pt-2 mb-6">1.5M FOLLOWERS<br/>16.7M LIKES</p>
               
               <div className="flex flex-col gap-3 pt-2">
                  <a href="https://www.tiktok.com/@kalu.putic" target="_blank" rel="noopener noreferrer" className="border border-white/40 px-4 py-3 hover:bg-white hover:text-[#7a8b99] transition-colors flex justify-between items-center w-full max-w-[240px] opacity-100">
                     <span>[ TIKTOK ]</span>
                     <span className="font-bold">@KALU.PUTIC</span>
                  </a>
                  <a href="https://www.instagram.com/kaluputics" target="_blank" rel="noopener noreferrer" className="border border-white/40 px-4 py-3 hover:bg-white hover:text-[#7a8b99] transition-colors flex justify-between items-center w-full max-w-[240px] opacity-100">
                     <span>[ IG ]</span>
                     <span className="font-bold">@KALUPUTICS</span>
                  </a>
               </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-[3rem] sm:text-[5rem] lg:text-[7rem] font-['Anton'] leading-[0.9] tracking-tight uppercase mb-8 sm:-ml-1">
                NOT FOR MANY<br/>FOR THE FEW
              </h2>
              <p className="font-mono text-[9px] sm:text-[10px] opacity-80 uppercase tracking-[0.15em] leading-[2] max-w-2xl text-justify border-l border-white/20 pl-4 sm:pl-8">
                WE DON'T FOLLOW TRENDS. WE RESCUE, REINVENT, AND REDEFINE. EVERY PANEL, STITCH, AND TEXTURE IS A PIECE OF OUR ETHIOPIAN IDENTITY, WOVEN INTO SUSTAINABLE STREETWEAR FOR THE BOLD.
                <br/><br/>
                <span className="text-white opacity-100">"THIS KID IS THE NEXT BIG THING IN FASHION."</span><br/>
                <span className="text-white opacity-100">"AFRICAN CREATIVITY ON A GLOBAL LEVEL."</span><br/>
                <span className="text-white opacity-100">"KALU IS WHAT FASHION IS SUPPOSED TO BE."</span>
              </p>
            </div>
          </motion.section>

          {/* Big Text Block */}
          <motion.section {...fadeInUp} className="mb-16 sm:mb-32 mt-24 sm:mt-40 border-t border-white/20 pt-16 سم:pt-24 relative">
             <h2 className="text-[3.5rem] sm:text-[6.5vw] font-['Anton'] leading-[0.85] tracking-tight uppercase max-w-6xl -ml-1">
                WE DON'T JUST<br/>WEAR CLOTHES,<br/>WE TELL STORIES
             </h2>
             <div className="flex justify-end mt-8 sm:mt-0 sm:absolute sm:right-8 sm:top-24">
                <div className="flex gap-4 items-center">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white flex items-center justify-center transform -rotate-45 text-xl hover:bg-white hover:text-[#7a8b99] transition-colors cursor-pointer">→</div>
                   <div className="font-mono text-sm leading-none">
                     <div className="opacity-70 uppercase tracking-widest text-[9px] mb-1.5 border-b border-white/20 pb-1.5">ADD TO CART</div>
                     <div className="text-xl sm:text-2xl font-bold tracking-tight">$999.99</div>
                   </div>
                </div>
             </div>
             
             <div className="mt-20 sm:mt-32 text-right">
               <h2 className="text-[2.5rem] sm:text-[4vw] font-['Anton'] leading-[0.9] tracking-tight uppercase text-white/40 inline-block pr-0 sm:pr-8">
                 YOU DON'T BLEND IN<br/><span className="text-white opacity-90">YOU STAND OUT</span>
               </h2>
             </div>
          </motion.section>

          {/* My Work / Inventory */}
          <motion.section {...fadeInUp} className="mb-24 sm:mb-40 pt-16 sm:pt-24 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-4 mb-12 gap-8">
              <h2 className="text-4xl sm:text-[3.5rem] font-['Anton'] uppercase leading-[0.9] -ml-1">
                STREET LEVEL INVENTORY
              </h2>
              <span className="border border-white/40 px-5 py-2 font-mono text-[9px] uppercase rounded-full tracking-[0.2em] cursor-pointer hover:bg-white hover:text-[#7a8b99] transition-colors">
                FILTERS (03)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { file: "kalu-01.png", name: "MERKATO PUFFER", price: "$85.00" },
                { file: "kalu-02.png", name: "ADDIS BOMBER", price: "$120.00" },
                { file: "kalu-03.png", name: "STREET WEAVER", price: "$95.00" },
                { file: "kalu-04.png", name: "NOMAD TRENCH", price: "$145.00" },
                { file: "kalu-05.png", name: "UPCYCLED VEST", price: "$65.00" },
                { file: "kalu-06.png", name: "HABESHA DRIP", price: "$110.00" },
                { file: "kalu-07.png", name: "URBAN WARRIOR", price: "$180.00" },
                { file: "kalu-08.png", name: "VINTAGE SHELL", price: "$45.00" },
              ].map((product, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-[#6c7f8c] border border-white/10 relative overflow-hidden flex items-center justify-center p-0 group-hover:border-white/40 transition-colors duration-500">
                    {/* Add technical corner markers */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 z-10"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 z-10"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 z-10"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 z-10"></div>

                    <img src={`/kalu putic/${product.file}`} className="w-full h-full object-cover filter brightness-[0.9] saturate-[0.75] contrast-[1.1] group-hover:saturate-100 group-hover:scale-105 transition-all duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)] origin-bottom" alt={`Work ${i + 1}`} />
                    
                    {/* Hover technical overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#6c7f8c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white flex justify-between items-end border-b border-white/20 pb-2">
                        <span>[ SYSTEM ALIGNMENT ]</span>
                        <span>OPT/ {String(i+1).padStart(2,'0')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] opacity-80 space-y-1">
                     <div className="flex justify-between items-center w-full gap-2">
                        <span className="truncate flex-1 text-white opacity-100 font-bold">{product.name}</span>
                        <span>{product.price}</span>
                     </div>
                     <span className="truncate opacity-50 block">ETHIOPIAN_ORIGINAL / UPCYCLED</span>
                     <div className="flex gap-1.5 items-center pt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-30"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-70"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white text-[7px] flex items-center justify-center pl-4 opacity-50 tracking-[0.3em]">OUTFIT</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Contact & Footer */}
          <motion.section {...fadeInUp} className="border-t border-white/20 pt-16 sm:pt-24 mt-24">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
               <div>
                  <h2 className="text-[2.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-['Anton'] leading-[0.9] tracking-tight uppercase mb-8 text-white/50 -ml-1">
                    DESIGNED<br/><span className="text-white opacity-90">FOR ACTION</span>
                  </h2>
                  <div className="font-mono text-[9px] sm:text-[10px] opacity-70 uppercase tracking-[0.15em] leading-[2] max-w-sm border-l border-white/20 pl-4 sm:pl-6">
                    <p>FOR COLLABORATIONS, FEATURES, OR PRESS INQUIRIES.</p>
                    <p className="mt-4">NO BIG BUDGET. NO STUDIO. JUST VISION, SCISSORS AND PASSION.</p>
                  </div>
               </div>
               
               <form className="space-y-8 font-mono text-[10px] uppercase tracking-[0.15em]" onSubmit={(e) => {
                 e.preventDefault();
                 const formData = new FormData(e.currentTarget);
                 const name = formData.get('name');
                 const email = formData.get('email');
                 const message = formData.get('message');
                 window.location.href = `mailto:kasabelmedia@gmail.com?subject=Contact from ${name}&body=${message} (%0A%0AFrom: ${email})`;
               }}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="opacity-70 flex items-center justify-between">
                       <span>[ NAME ]</span>
                       <span className="opacity-30">01</span>
                     </label>
                     <input name="name" required type="text" className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 placeholder:tracking-[0.1em]" placeholder="ENTER IDENTIFIER" />
                   </div>
                   <div className="space-y-3">
                     <label className="opacity-70 flex items-center justify-between">
                       <span>[ EMAIL ]</span>
                       <span className="opacity-30">02</span>
                     </label>
                     <input name="email" required type="email" className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 placeholder:tracking-[0.1em]" placeholder="ENTER COMMS" />
                   </div>
                 </div>
                 <div className="space-y-3 pt-6">
                   <label className="opacity-70 flex items-center justify-between">
                     <span>[ MESSAGE ]</span>
                     <span className="opacity-30">03</span>
                   </label>
                   <textarea name="message" required rows={5} className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/20 placeholder:tracking-[0.1em] resize-none" placeholder="INITIATE PROTOCOL"></textarea>
                 </div>
                 <div className="pt-8 flex justify-end">
                   <button type="submit" className="border border-white hover:bg-white hover:text-[#7a8b99] text-white px-12 py-4 transition-colors font-bold tracking-[0.2em]">
                     [ TRANSMIT ]
                   </button>
                 </div>
               </form>
             </div>
             
             <div className="mt-24 sm:mt-40 flex flex-col sm:flex-row justify-between items-center sm:items-end font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 border-t border-white/20 pt-8 pb-4 gap-4 sm:gap-0">
               <div className="text-center sm:text-left">
                 [ © 2026 KALU PUTIC ]<br/>
                 <span className="block mt-1">MADE IN ETHIOPIA 🇪🇹</span>
               </div>
               <div className="text-center sm:text-right">
                  [ VISUAL TEMP: -38° ]<br/>
                  <span className="block mt-1">ALL RIGHTS RESERVED</span>
               </div>
             </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
