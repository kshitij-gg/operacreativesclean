import { useEffect, Suspense, lazy } from 'react';
import gsap from '@/vendor/gsap';
import { ScrollTrigger } from '@/vendor/ScrollTrigger';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ScrollProgress from '@/components/ScrollProgress';
import SectionIndicator from '@/components/SectionIndicator';
import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

// Lazy-loaded below-fold sections
const AboutSection     = lazy(() => import('@/components/AboutSection'));
const WeBelieveSection = lazy(() => import('@/components/WeBelieveSection'));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'));
const StaticAdsSection = lazy(() => import('@/components/StaticAdsSection'));
const CollaborateSection = lazy(() => import('@/components/CollaborateSection'));
const Footer           = lazy(() => import('@/components/Footer'));

// ─── THE OPERA COLOR JOURNEY ──────────────────────────────────
// Note: WeBelieveSection handles its own GSAP sub-scroll internally (color wheel scrub).
// The outer GSAP triggers here handle the "between section" color jumps.
const SECTION_BG: Record<string, string> = {
  '0':  '#000000',   // Hero
  '1':  '#FF4B6E',   // Who We Are
  '2':  '#FF6B8A',   // We Believe entrance (scrub handles the rest internally)
  '3':  '#FFFFFF',   // Our Work
  '4':  '#FFFFFF',   // Process (inherits white from Our Work)
  '5':  '#C0152A',   // Collaborate — deep theatre red
  '6':  '#F5F0E8',   // Footer
};

const Fallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <span className="font-mono text-[10px] tracking-widest animate-pulse uppercase text-white/30">Loading…</span>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Set initial bg
    document.body.style.backgroundColor = '#000000';

    // Wait until sections are mounted before wiring ScrollTrigger
    // Set initial bg globally but let sections define their own local backgrounds
    document.body.style.backgroundColor = '#000000';
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Global chrome */}
      <ScrollProgress />
      <Navbar />
      <SectionIndicator />
      <CustomCursor />

      {/* ── THE OPERA — 7 ACTS ────────────────────────────────── */}
      <main>

        <Suspense fallback={<Fallback />}>
          {/* ACT 1 — HERO with embedded showreel */}
          <HeroSection />

          {/* ACT 4 — OUR WORK — pure white */}
          <PortfolioSection />

          {/* ACT 4b — STATIC ADS — floating portrait gallery */}
          <StaticAdsSection />

          {/* ACT 3 — WE BELIEVE / Craft & Fidelity */}
          <WeBelieveSection />

          {/* ACT 2 — WHO WE ARE / AI Agents */}
          <AboutSection />

          {/* ACT 6 — COLLABORATE — bright yellow #FFE066 */}
          <CollaborateSection />

          {/* ACT 7 — FOOTER — warm cream #F5F0E8 */}
          <Footer />

        </Suspense>
      </main>
    </>
  );
};

export default Index;
