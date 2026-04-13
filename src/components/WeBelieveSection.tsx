import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from '@/vendor/gsap';
import { ScrollTrigger } from '@/vendor/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StrugglingWorkerSVG = () => {
  return (
    <div className="relative w-full aspect-video flex justify-center items-center">
      <style>{`
        @keyframes franticTyping {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-5deg) translateY(-10px); }
          50% { transform: rotate(5deg) translateY(5px); }
          75% { transform: rotate(-10deg) translateY(-5px); }
        }
        @keyframes stressShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px) translateY(2px); }
          40% { transform: translateX(3px) translateY(-1px); }
          60% { transform: translateX(-2px) translateY(1px); }
          80% { transform: translateX(2px) translateY(0); }
        }
        @keyframes sweatFly {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          50% { transform: translate(30px, -40px) scale(1); opacity: 1; }
          100% { transform: translate(60px, -80px) scale(1.5); opacity: 0; }
        }
        @keyframes screenError {
          0%, 100% { fill: #222; }
          5% { fill: #FF3B30; }
          10% { fill: #222; }
          40% { fill: #222; }
          45% { fill: #FF3B30; }
          50% { fill: #222; }
        }
        @keyframes windowPop {
          0% { opacity: 0; transform: scale(0.8); }
          10%, 90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
      <svg viewBox="0 0 800 500" className="w-full h-full overflow-visible">
        {/* Desk */}
        <path d="M 100 450 L 700 450 L 750 480 L 50 480 Z" fill="#222" stroke="#111" strokeWidth="4" />

        {/* 3 Chaotic Monitors */}
        <g stroke="#111" strokeWidth="6" rx="8" ry="8">
          <rect x="150" y="200" width="120" height="180" fill="#333" transform="rotate(-15 210 290)" />
          <rect x="530" y="200" width="120" height="180" fill="#333" transform="rotate(15 590 290)" />
          <rect x="300" y="150" width="200" height="150" fill="#222" style={{ animation: 'screenError 4s infinite' }} />
          <rect x="380" y="300" width="40" height="50" fill="#555" />
          <path d="M 330 350 L 470 350 L 480 370 L 320 370 Z" fill="#555" />
        </g>
        
        {/* Chaotic Error Windows on Main Screen */}
        <g>
          <rect x="320" y="170" width="60" height="40" fill="#FFF" stroke="#FF3B30" strokeWidth="2" style={{ animation: 'windowPop 3s infinite 0.5s' }} />
          <rect x="340" y="200" width="80" height="50" fill="#FFF" stroke="#FF3B30" strokeWidth="2" style={{ animation: 'windowPop 2s infinite 1s' }} />
          <rect x="380" y="160" width="90" height="60" fill="#FFF" stroke="#FF3B30" strokeWidth="2" style={{ animation: 'windowPop 4s infinite 1.5s' }} />
        </g>

        {/* Character Base (Hunched) */}
        <path d="M 360 450 Q 350 400 380 320 Q 420 400 440 450 Z" fill="#E6E6E6" stroke="#111" strokeWidth="6" />
        
        {/* Head (Shaking) */}
        <g style={{ animation: 'stressShake 0.5s infinite', transformOrigin: '400px 300px' }}>
          <circle cx="400" cy="270" r="35" fill="#FFC8B4" stroke="#111" strokeWidth="6" />
          {/* Tired Eyes */}
          <line x1="385" y1="265" x2="395" y2="265" stroke="#111" strokeWidth="3" />
          <line x1="405" y1="265" x2="415" y2="265" stroke="#111" strokeWidth="3" />
          <path d="M 390 280 Q 400 290 410 280" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          {/* Messy Hair */}
          <path d="M 370 250 Q 400 210 430 250 Q 435 220 400 230 Q 365 220 370 250" fill="#4A3424" />
        </g>

        {/* Flying Sweat Droplets */}
        <path d="M 430 250 Q 440 240 435 235 Q 430 240 430 250" fill="#66D9FF" opacity="0" style={{ animation: 'sweatFly 1.5s infinite 0s' }} />
        <path d="M 370 260 Q 360 250 365 245 Q 370 250 370 260" fill="#66D9FF" opacity="0" style={{ animation: 'sweatFly 1.2s infinite 0.3s' }} />
        <path d="M 420 230 Q 430 220 425 215 Q 420 220 420 230" fill="#66D9FF" opacity="0" style={{ animation: 'sweatFly 1.8s infinite 0.7s' }} />

        {/* Frantic Left Arm */}
        <g style={{ animation: 'franticTyping 0.2s infinite', transformOrigin: '380px 340px' }}>
          <path d="M 380 340 Q 320 380 340 410 L 320 440" fill="none" stroke="#111" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 380 340 Q 320 380 340 410 L 320 440" fill="none" stroke="#E6E6E6" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* Frantic Right Arm */}
        <g style={{ animation: 'franticTyping 0.15s infinite reverse', transformOrigin: '420px 340px' }}>
          <path d="M 420 340 Q 480 380 460 410 L 480 440" fill="none" stroke="#111" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 420 340 Q 480 380 460 410 L 480 440" fill="none" stroke="#E6E6E6" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Foreground Keyboard/Papers */}
        <rect x="300" y="440" width="200" height="30" fill="#444" transform="skewX(-15)" />
        <path d="M 200 460 L 250 440 L 280 450 L 230 470 Z" fill="#FFF" stroke="#111" strokeWidth="2" />
        <path d="M 550 450 L 600 440 L 620 460 L 570 470 Z" fill="#FFF" stroke="#111" strokeWidth="2" transform="rotate(15 580 450)" />
      </svg>
    </div>
  );
};

const ChillingAIUserSVG = () => {
  return (
    <div className="relative w-full aspect-video flex justify-center items-center">
      <style>{`
        @keyframes floatLeg {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-5px); }
        }
        @keyframes steamRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { transform: translateY(-40px) scale(1.5); opacity: 0.5; }
          100% { transform: translateY(-50px) scale(2); opacity: 0; }
        }
        @keyframes dataFlowSmooth {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes tapFinger {
          0%, 80%, 100% { transform: translateY(0); }
          90% { transform: translateY(5px); }
        }
        @keyframes screenGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.2)); }
          50% { filter: drop-shadow(0 0 25px rgba(0, 229, 255, 0.4)); }
        }
      `}</style>
      <svg viewBox="0 0 800 500" className="w-full h-full overflow-visible">
        {/* Minimal Desk */}
        <path d="M 450 400 L 750 400 L 780 430 L 420 430 Z" fill="#1A1A1A" stroke="#00E5FF" strokeWidth="2" />
        <rect x="630" y="320" width="10" height="80" fill="#333" />
        
        {/* Sleek Screen */}
        <path d="M 520 180 L 720 180 Q 730 180 730 190 L 730 320 Q 730 330 720 330 L 520 330 Q 510 330 510 320 L 510 190 Q 510 180 520 180 Z" 
              fill="#0A0A0A" stroke="#333" strokeWidth="4" style={{ animation: 'screenGlow 4s infinite' }} />

        {/* Screen Progress (100x Speed) */}
        <g>
          <path d="M 530 250 Q 580 200 630 250 T 710 250" fill="none" stroke="#222" strokeWidth="8" strokeLinecap="round" />
          <path d="M 530 250 Q 580 200 630 250 T 710 250" fill="none" stroke="#00E5FF" strokeWidth="8" strokeLinecap="round" strokeDasharray="200" style={{ animation: 'dataFlowSmooth 1.5s linear infinite' }} />
          <circle cx="530" cy="290" r="4" fill="#FFE066" />
          <line x1="550" y1="290" x2="680" y2="290" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <line x1="550" y1="290" x2="620" y2="290" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" style={{ animation: 'dataFlowSmooth 1s linear infinite' }} />
          <rect x="530" y="210" width="40" height="6" fill="#FFF" opacity="0.8" rx="3" />
          <rect x="580" y="210" width="80" height="6" fill="#FFF" opacity="0.4" rx="3" />
        </g>

        {/* UI / Decor */}
        <path d="M 740 400 Q 750 350 780 320 Q 760 380 740 400" fill="#333" />
        <path d="M 735 400 Q 720 360 690 340 Q 720 380 735 400" fill="#222" />

        {/* Chair & Character Body (Reclined) */}
        <path d="M 180 200 Q 150 350 200 450 L 250 450 Q 300 350 250 200 Z" fill="#222" />
        <path d="M 230 220 Q 200 320 280 380 L 320 330 Q 280 280 230 220 Z" fill="#F4F4F4" stroke="#111" strokeWidth="6" />

        {/* Head */}
        <circle cx="260" cy="180" r="35" fill="#FFC8B4" stroke="#111" strokeWidth="6" />
        <path d="M 270 170 Q 280 175 290 170" fill="none" stroke="#111" strokeWidth="3" />
        <path d="M 285 185 L 295 185" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
        <path d="M 240 140 Q 260 130 280 140 Q 280 160 260 150 Q 240 160 240 140 Z" fill="#111" />
        <rect x="270" y="165" width="20" height="10" rx="3" fill="#111" />
        <path d="M 250 170 L 270 170" stroke="#111" strokeWidth="3" />

        {/* Legs on Desk */}
        <g style={{ animation: 'floatLeg 4s ease-in-out infinite', transformOrigin: '280px 350px' }}>
          <path d="M 270 360 Q 380 430 480 380" fill="none" stroke="#111" strokeWidth="34" strokeLinecap="round" />
          <path d="M 270 360 Q 380 430 480 380" fill="none" stroke="#333" strokeWidth="28" strokeLinecap="round" />
          <path d="M 460 365 Q 490 350 510 370 L 510 390 L 460 390 Z" fill="#FFF" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 470 380 L 500 380" stroke="#FF6B8A" strokeWidth="3" />
        </g>

        {/* Left Arm with Coffee */}
        <path d="M 240 250 Q 200 300 180 280 Q 160 260 190 230" fill="none" stroke="#111" strokeWidth="24" strokeLinecap="round" />
        <path d="M 240 250 Q 200 300 180 280 Q 160 260 190 230" fill="none" stroke="#F4F4F4" strokeWidth="18" strokeLinecap="round" />
        <path d="M 175 220 L 195 220 L 190 250 L 180 250 Z" fill="#FFF" stroke="#111" strokeWidth="4" />
        <path d="M 195 230 Q 205 230 205 240 Q 205 245 195 245" fill="none" stroke="#111" strokeWidth="4" />
        <path d="M 180 210 Q 175 190 185 180" fill="none" stroke="#FFF" strokeWidth="3" style={{ animation: 'steamRise 3s infinite 0.5s' }} opacity="0" />
        <path d="M 190 215 Q 195 195 185 185" fill="none" stroke="#FFF" strokeWidth="3" style={{ animation: 'steamRise 3s infinite 1.5s' }} opacity="0" />

        {/* Right Arm Tapping */}
        <path d="M 270 260 Q 350 280 440 260 L 460 300" fill="none" stroke="#111" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 270 260 Q 350 280 440 260 L 460 300" fill="none" stroke="#F4F4F4" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="440,310 490,305 490,315 440,320" fill="#CCC" />
        <ellipse cx="465" cy="305" rx="5" ry="8" fill="#FFC8B4" transform="rotate(30 465 305)" style={{ animation: 'tapFinger 3s infinite' }} />
      </svg>
    </div>
  );
};



const WeBelieveSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Extensive scrubbing timeline maps the whole height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', // Start morphing logic as soon as section enters screen to prevent black bg overlap
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });
      // Using strict duration fractions for scrub timelines
      // At 0 progress, body is inherited as '#1a0000' (maroon)
      tl.to('body', { backgroundColor: '#FF7D00', duration: 0.25, ease: 'none' }, 0); // 0.0 to 0.25 -> Orange
      tl.to('body', { backgroundColor: '#FFD166', duration: 0.25, ease: 'none' }, 0.25); // 0.25 to 0.50 -> Yellow
      tl.to('body', { backgroundColor: '#B8E986', duration: 0.25, ease: 'none' }, 0.50); // 0.50 to 0.75 -> Green
      tl.to('body', { backgroundColor: '#4FC3F7', duration: 0.25, ease: 'none' }, 0.75); // 0.75 to 1.00 -> Blue

      // Text colors:
      // We force the initial state to be White, so it's perfectly readable on Maroon.
      // Then, between 15% and 25% of scroll (as bg becomes heavily Orange), we morph to Dark Maroon.
      tl.fromTo(sectionRef.current, {
        '--dynamic-text': '#FFFFFF',
        '--dynamic-subtext': 'rgba(255,255,255,0.85)',
        '--dynamic-border': 'rgba(255,255,255,0.2)',
        '--dynamic-pill-bg': 'rgba(255,255,255,0.1)',
      }, {
        '--dynamic-text': '#2A0000',
        '--dynamic-subtext': 'rgba(42,0,0,0.85)',
        '--dynamic-border': 'rgba(42,0,0,0.3)',
        '--dynamic-pill-bg': 'rgba(42,0,0,0.1)',
        ease: 'power2.inOut',
        duration: 0.10
      }, 0.15); 
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="we-believe"
      data-section="2"
      data-bg="#FF6B8A"
      ref={sectionRef}
      className="relative w-full"
      style={{ 
        zIndex: 1, 
        '--dynamic-text': '#FFFFFF', 
        '--dynamic-subtext': 'rgba(255,255,255,0.8)',
        '--dynamic-border': 'rgba(255,255,255,0.2)',
        '--dynamic-pill-bg': 'rgba(255,255,255,0.1)' 
      } as React.CSSProperties}
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 pt-24 pb-32">
        
        {/* BLOCK 1: The Traditional Struggle */}
        <div className="w-full min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-16 lg:py-24 border-b border-[#111]/10">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center mb-6">
              <span 
                className="font-mono text-[14px] sm:text-[16px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border backdrop-blur-md" 
                style={{ color: 'var(--dynamic-text)', backgroundColor: 'var(--dynamic-pill-bg)', borderColor: 'var(--dynamic-border)' }}
              >
                CRAFT & FIDELITY
              </span>
            </div>
            
            <h2 className="font-heading tracking-tight mb-8" style={{ fontSize: 'clamp(4rem, 9vw, 120px)', lineHeight: 0.95, color: 'var(--dynamic-text)' }}>
              High-fidelity <br />
              <span className="opacity-90" style={{ fontStyle: 'italic', textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>production.</span>
            </h2>
            
            <p className="font-body text-[20px] sm:text-[26px] xl:text-[28px] max-w-2xl leading-relaxed" style={{ color: 'var(--dynamic-subtext)' }}>
              Classical composition meets generative precision: product worlds, talent-grade retouching, and channel-native finishing. The problem used to be speed; now, we solve for perfection.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }} 
            whileInView={{ opacity: 1, scale: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
             <div className="w-full aspect-video flex items-center justify-center p-0 lg:p-8">
                <StrugglingWorkerSVG />
             </div>
          </motion.div>

        </div>

        {/* BLOCK 2: The Modern Solution (AI Speed) */}
        <div className="w-full min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-16 lg:py-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }} 
            whileInView={{ opacity: 1, scale: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full order-2 lg:order-1"
          >
             <div className="w-full aspect-video flex items-center justify-center p-0 lg:p-8">
                <ChillingAIUserSVG />
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: '-10%' }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            <div className="font-heading italic tracking-tighter" style={{ fontSize: 'clamp(6rem, 12vw, 200px)', lineHeight: 0.8, color: 'var(--dynamic-text)' }}>
              100x
            </div>
            <div className="mt-6 mb-8 flex justify-start">
              <span className="font-mono text-[18px] sm:text-[22px] font-bold tracking-[0.4em] px-8 py-3 rounded-full border shadow-2xl backdrop-blur-md" style={{ color: 'var(--dynamic-text)', backgroundColor: 'var(--dynamic-pill-bg)', borderColor: 'var(--dynamic-border)' }}>
                FASTER OUTPUT
              </span>
            </div>
            
            <p className="font-body text-[20px] sm:text-[26px] xl:text-[28px] max-w-xl leading-relaxed" style={{ color: 'var(--dynamic-subtext)' }}>
              Enter Opera Creatives. We've replaced bloated production cycles with pure, unhindered speed. Our AI pipelines generate, iterate, and deliver campaigns at lightning pace, fundamentally altering the unit economics of premium visuals.
            </p>
          </motion.div>

        </div>



      </div>
    </section>
  );
};

export default WeBelieveSection;