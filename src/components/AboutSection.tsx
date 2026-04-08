import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInfinity?: boolean;
}

const AnimatedStat = ({ value, suffix, label, delay, isInfinity }: StatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !isInfinity) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay);
    }
  }, [isInView, value, delay, motionValue, isInfinity]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      className="relative py-6 sm:py-8 group"
    >
      {/* Top divider line — thin, animated */}
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-foreground/10"
        initial={{ width: '0%' }}
        animate={isInView ? { width: '100%' } : {}}
        transition={{ duration: 0.8, delay: delay / 1000 + 0.2, ease: 'easeOut' }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute top-0 left-0 w-[2px] bg-accent origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.1 }}
        style={{ height: '100%' }}
      />

      <div className="pl-5">
        {/* Animated number */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-heading text-accent flex items-end leading-none tabular-nums">
          {isInfinity ? '∞' : displayValue}
          {!isInfinity && (
            <span className="text-3xl sm:text-4xl mb-1 ml-0.5">{suffix}</span>
          )}
        </div>
        {/* Label */}
        <div className="mt-2 text-muted-foreground font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  const descLines = [
    'Opera Creatives is an AI-first creative agency building next-generation',
    'visual content for brands, startups, and enterprises. From concept to',
    'final cut, every frame, pixel, and sound is generated using the most',
    'advanced AI tools on the planet.',
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* ── BIG typographic watermark behind the headline ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="font-heading text-[18vw] sm:text-[14vw] leading-none text-foreground/[0.028] uppercase whitespace-nowrap"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ marginTop: '-2vw' }}
        >
          FILM
        </motion.div>
      </div>

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16">

          {/* ── Left Column — 60% ── */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.span
              variants={itemVariants}
              className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent uppercase"
            >
              WHO WE ARE
            </motion.span>

            {/* Main headline — sits on top of the watermark */}
            <TextReveal
              className="mt-4 sm:mt-6 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
              delay={0.3}
            >
              The future of film is AI.
              We're already there.
            </TextReveal>

            {/* Staggered description lines */}
            <div className="mt-5 sm:mt-8">
              {descLines.map((line, i) => (
                <motion.p
                  key={i}
                  variants={itemVariants}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Pull quote */}
            <motion.blockquote
              variants={itemVariants}
              className="mt-8 sm:mt-10 pl-5 border-l-2 border-accent"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-foreground italic font-heading leading-snug">
                "We don't just use AI — we think in AI."
              </p>
            </motion.blockquote>

            <motion.p
              variants={itemVariants}
              className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Whether it's a cinematic ad campaign, a scroll-stopping social visual, or a
              full-length AI film — we produce content that looks like it came from a
              world-class studio, at the speed only AI can deliver.
            </motion.p>
          </motion.div>

          {/* ── Right Column — Stats with anchors ── */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-center gap-2 sm:gap-4 mt-2 lg:mt-0">
            <AnimatedStat
              value={50}
              suffix="+"
              label="Projects Delivered"
              delay={200}
            />
            <AnimatedStat
              value={15}
              suffix="+"
              label="AI Tools Mastered"
              delay={400}
            />
            <AnimatedStat
              value={0}
              suffix=""
              isInfinity
              label="Creative Possibilities"
              delay={600}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
