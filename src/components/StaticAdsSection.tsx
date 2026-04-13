import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * STATIC ADS SECTION — Dual infinite marquee strips
 *
 * Row 1 drifts left, Row 2 drifts right.
 * CSS @keyframes animation runs on the compositor thread (no JS per frame).
 * Pauses via animationPlayState when section is off-screen.
 */

const STATIC_IMAGES = [
  { id: 1,  src: 'https://images.pexels.com/photos/1126935/pexels-photo-1126935.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'LUXURY ESSENTIALS', cat: 'Product · AI' },
  { id: 2,  src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'SILK & SHADOW',      cat: 'Fashion · Portrait' },
  { id: 3,  src: 'https://images.pexels.com/photos/6620577/pexels-photo-6620577.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'NEO-FUTURE',         cat: 'Concept · Editorial' },
  { id: 4,  src: 'https://images.pexels.com/photos/1638841/pexels-photo-1638841.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'ARCHITECTURAL',      cat: 'Real Estate · AI' },
  { id: 5,  src: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'AURIC GLOW',         cat: 'Beauty · Portrait' },
  { id: 6,  src: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'CHROME NOIR',        cat: 'Automotive · Concept' },
  { id: 7,  src: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'AMBER RITUAL',       cat: 'Fragrance · Still' },
  { id: 8,  src: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'VOID THEORY',        cat: 'Fashion · Editorial' },
  { id: 9,  src: 'https://images.pexels.com/photos/5698401/pexels-photo-5698401.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'ZENITH DROP',        cat: 'Streetwear · Still' },
  { id: 10, src: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=450&h=600&fit=crop',  label: 'GHOST BLOOM',        cat: 'Perfume · Concept' },
];

const Card = ({ item }: { item: typeof STATIC_IMAGES[0] }) => (
  <div
    style={{ position: 'relative', flexShrink: 0, width: 440, height: 586, marginRight: 28, borderRadius: 16, overflow: 'hidden' }}
    className="group cursor-pointer"
  >
    <img
      src={item.src}
      alt={item.label}
      width={440}
      height={586}
      loading="lazy"
      decoding="async"
      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', willChange: 'transform' }}
      className="group-hover:scale-105"
    />
    <div
      style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', transition: 'background 0.35s ease' }}
      className="group-hover:!bg-white/75"
    >
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8B0000', marginBottom: 10, opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:!opacity-100">{item.cat}</span>
      <h4 style={{ fontSize: 24, color: '#111', opacity: 0, transition: 'opacity 0.3s 0.05s', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.04em' }} className="group-hover:!opacity-100">{item.label}</h4>
    </div>
    <div style={{ position: 'absolute', top: 14, left: 14, transition: 'opacity 0.3s' }} className="group-hover:!opacity-0">
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', background: 'rgba(255,255,255,0.88)', padding: '4px 12px', borderRadius: 99 }}>■ STATIC</span>
    </div>
  </div>
);

/* Single left-drifting marquee using the -50% trick for a seamless loop */
const MarqueeRow = ({ items, speed = 55, paused = false }: { items: typeof STATIC_IMAGES; speed?: number; paused?: boolean }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: `static-marquee-left ${speed}s linear infinite`, animationPlayState: paused ? 'paused' : 'running', willChange: 'transform' }}>
        {doubled.map((item, i) => <Card key={`${item.id}-${i}`} item={item} />)}
      </div>
      <style>{`
        @keyframes static-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

const StaticAdsSection = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '0px' });

  return (
    <section ref={ref} id="static-ads" data-section="3b" data-bg="#FAFAFA" style={{ backgroundColor: '#FAFAFA', paddingBottom: 80 }}>
      <motion.div
        className="w-full mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-14"
        style={{ maxWidth: '1800px' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8B0000] block mb-3">■ Static Ads</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(3.5rem, 9vw, 130px)', lineHeight: 0.88, color: '#111' }}>
              STILL.<br />STRIKING.
            </h2>
          </div>
          <p className="font-body text-[15px] text-[#555] max-w-sm" style={{ fontStyle: 'italic', lineHeight: 1.65 }}>
            Every frame is a decision. AI-generated static visuals crafted for scroll-stopping precision — no cameras, all intent.
          </p>
        </div>
      </motion.div>

      <MarqueeRow items={STATIC_IMAGES} speed={50} paused={!inView} />
    </section>
  );
};

export default StaticAdsSection;
