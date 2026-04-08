import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4';
const HERO_POSTER_URL = 'https://images.pexels.com/videos/3129957/free-video-3129957.jpg?auto=compress&cs=tinysrgb&w=1920';

const HeroSection = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });
  
  // Maps the scroll progress from 0 to 1, to a Y transform of 0% to 30%.
  // This causes the background to scroll significantly slower than the text, achieving ultra-smooth parallax.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const lineVars = {
    hidden: { opacity: 0, y: 60, skewY: 3 },
    show: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.9, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="h-screen w-full relative z-0">
      <section className="absolute inset-0 h-screen w-full overflow-hidden z-0">

        {/* Layer 1: Background Video Parallax */}
        <motion.div 
          className="absolute inset-[-15%] w-[130%] h-[130%]" 
          style={{ y: backgroundY }}
        >
          <video
            src={HERO_VIDEO_URL}
            poster={HERO_POSTER_URL}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </motion.div>

        {/* Layer 2: Foreground decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <motion.div
            className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-accent/20"
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-white/15"
            animate={{ y: [0, 8, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Vignette pulse */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'vignette-pulse 10s ease-in-out infinite' }}
        />

        {/* Layer 3: Content — no translucent "Opera" overlay */}
        <div className="relative z-10 h-[100dvh] w-full px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 pointer-events-none">
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-3xl leading-[1.05] uppercase tracking-tight"
            style={{ wordSpacing: '0.15em' }}
          >
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineVars} className="block">
                AI Film Production
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineVars} className="block">
                Without Limits
              </motion.span>
            </span>
          </motion.h1>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 xl:hidden">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <ChevronDown
            size={18}
            className="text-white/40"
            style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
