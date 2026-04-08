import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';

/* ─── Strip data ─── */
const strips = [
  {
    image: portfolio1,
    title: 'AI Commercials',
    subtitle: 'Performance-driven ads crafted by AI',
    tag: 'Commercial',
    videoUrl: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
  },
  {
    image: portfolio2,
    title: 'AI Films',
    subtitle: 'Cinematic narratives, fully AI-generated',
    tag: 'Film',
    videoUrl: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  },
  {
    image: portfolio3,
    title: 'Visual Campaigns',
    subtitle: 'Scroll-stopping visuals at scale',
    tag: 'Campaign',
    videoUrl: 'https://videos.pexels.com/video-files/4065924/4065924-uhd_2560_1440_24fps.mp4',
  },
  {
    image: portfolio4,
    title: 'More Projects',
    subtitle: 'Explore the full portfolio',
    tag: 'View All',
    videoUrl: null,
    isMoreLink: true,
  },
];

/* ─── Individual Strip ─── */
const ProjectStrip = ({
  strip,
  index,
  isExpanded,
  anyExpanded,
  onHover,
  onLeave,
  onClick,
}: {
  strip: (typeof strips)[0];
  index: number;
  isExpanded: boolean;
  anyExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHoverStart = useCallback(() => {
    onHover();
    if (videoRef.current && strip.videoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [onHover, strip.videoUrl]);

  const handleHoverEnd = useCallback(() => {
    onLeave();
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [onLeave]);

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      animate={{ flex: isExpanded ? 4 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      data-cursor-hover
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={strip.image}
          alt={strip.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isExpanded ? 'scale(1.05)' : 'scale(1.15)' }}
        />
      </div>

      {/* Video layer */}
      {strip.videoUrl && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={videoRef}
            src={strip.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isExpanded
            ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.25) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Strip index number — top left */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/35">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Vertical rotated tag — visible in collapsed state, fades out on expand ── */}
      <motion.div
        className="absolute inset-y-0 right-4 z-20 pointer-events-none flex items-center"
        animate={{ opacity: anyExpanded && !isExpanded ? 0.25 : isExpanded ? 0 : 0.55 }}
        transition={{ duration: 0.4 }}
      >
        <span
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white uppercase whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {strip.tag}
        </span>
      </motion.div>

      {/* Content — bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-20 pointer-events-none">
        <motion.h3
          className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-wide leading-tight"
          animate={{ scale: isExpanded ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {strip.title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-xs sm:text-sm text-white/60 tracking-wide mt-2"
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 10 }}
          transition={{ duration: 0.4, delay: isExpanded ? 0.15 : 0 }}
        >
          {strip.subtitle}
        </motion.p>

        {/* More Projects CTA */}
        {strip.isMoreLink && (
          <motion.div
            className="flex items-center gap-3 mt-4 pointer-events-auto"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_hsl(var(--accent)/0.5)] transition-all duration-500">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              View All
            </span>
          </motion.div>
        )}

        {/* Playing indicator */}
        {!strip.isMoreLink && (
          <motion.div
            className="flex items-center gap-2 mt-3"
            animate={{ opacity: isExpanded ? 0.7 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Play className="w-3 h-3 text-white/60 fill-white/60" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
              Playing preview
            </span>
          </motion.div>
        )}
      </div>

      {/* Right separator */}
      {index < strips.length - 1 && (
        <div className="absolute top-0 right-0 w-[1px] h-full bg-white/[0.08] z-30" />
      )}
    </motion.div>
  );
};

/* ─── Main Portfolio Section ─── */
const PortfolioSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleStripClick = (index: number) => {
    if (strips[index].isMoreLink) navigate('/more-work');
  };

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-background">

      {/* ── Section Header — tighter, with right-side count ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-6 sm:pb-8">
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Left: label + heading */}
          <div>
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent uppercase">
              OUR WORK
            </span>
            <h2 className="mt-2 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
              Our Work.
            </h2>
          </div>

          {/* Right: project count + scroll hint */}
          <motion.div
            className="hidden sm:flex flex-col items-end gap-1 pb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              04 projects
            </span>
            <div className="flex items-center gap-2 text-muted-foreground/50">
              <span className="font-mono text-[9px] tracking-widest uppercase">hover to explore</span>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4H14M14 4L10 1M14 4L10 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── 4 Horizontal Strips ── */}
      <motion.div
        className="w-full flex"
        style={{ height: 'clamp(420px, 68vh, 780px)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        {strips.map((strip, index) => (
          <ProjectStrip
            key={index}
            strip={strip}
            index={index}
            isExpanded={expandedIndex === index}
            anyExpanded={expandedIndex !== null}
            onHover={() => setExpandedIndex(index)}
            onLeave={() => setExpandedIndex(null)}
            onClick={() => handleStripClick(index)}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default PortfolioSection;
