import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Target, Eye } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function MissionVision() {
  const { mission, vision } = companyProfileData.missionVision;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  const isMobile = windowWidth < 992;
  const shouldUseScrollAnimation = !isMobile && !prefersReducedMotion;

  // Scroll distance for the animation to complete
  const scrollTrackHeight = typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1500;
  const totalSectionHeight = shouldUseScrollAnimation ? scrollTrackHeight + (typeof window !== 'undefined' ? window.innerHeight : 1000) : 'auto';

  useIsomorphicLayoutEffect(() => {
    if (!shouldUseScrollAnimation) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollPastPin = -rect.top;

            if (scrollPastPin >= 0 && scrollPastPin <= scrollTrackHeight) {
              setScrollProgress(scrollPastPin / scrollTrackHeight);
            } else if (scrollPastPin < 0) {
              setScrollProgress(0);
            } else if (scrollPastPin > scrollTrackHeight) {
              setScrollProgress(1);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldUseScrollAnimation, scrollTrackHeight]);

  const interpolate = (start, end, progress) => start + (end - start) * progress;

  // We want the expansion to happen mostly between 0.1 and 0.9 for a smooth feel.
  const easedProgress = Math.min(Math.max((scrollProgress - 0.1) / 0.8, 0), 1);

  // Ease-in-out curve for cinematic feel
  const smoothProgress = easedProgress < 0.5
    ? 2 * easedProgress * easedProgress
    : 1 - Math.pow(-2 * easedProgress + 2, 2) / 2;

  // Clip-path inset logic:
  // Start: 60vw width (20vw inset L/R), 65vh height (17.5vh inset T/B)
  const insetX = interpolate(20, 0, smoothProgress); // vw
  const insetY = interpolate(17.5, 0, smoothProgress); // vh
  const borderRadius = interpolate(24, 0, smoothProgress); // px
  const clipPath = `inset(${insetY}vh ${insetX}vw ${insetY}vh ${insetX}vw round ${borderRadius}px)`;

  const imageScale = interpolate(1.2, 1.0, smoothProgress);

  // Title fades out early (0 to 0.3)
  const titleOpacity = Math.max(1 - (scrollProgress * 3), 0);
  const titleTranslateY = interpolate(0, -40, Math.min(scrollProgress * 3, 1));

  // Content fades in late (0.6 to 1.0)
  const contentProgress = Math.max((scrollProgress - 0.6) / 0.4, 0);
  const contentOpacity = contentProgress;
  const contentTranslateY = interpolate(40, 0, contentProgress);

  // Vision stagger (0.65 to 1.0)
  const visionProgress = Math.max((scrollProgress - 0.65) / 0.35, 0);
  const visionOpacity = visionProgress;
  const visionTranslateY = interpolate(40, 0, visionProgress);

  const scrimOpacity = interpolate(0, 1, smoothProgress);

  if (!shouldUseScrollAnimation) {
    // Mobile or Reduced Motion Fallback
    return (
      <section id="mission" style={{ padding: '60px 0', backgroundColor: '#FFFFFF', marginBottom: '0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', marginTop: '8px' }}>
              Our Mission & Vision
            </h2>
          </div>

          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '300px', marginBottom: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <img
              src="/images/our_mission_vision.png"
              alt="Mission & Vision"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Mission Panel */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={24} color="#FFFFFF" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                  OUR MISSION
                </h3>
              </div>
              <p style={{ color: '#334155', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>
                {mission.description}
              </p>
            </div>

            {/* Vision Panel */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={24} color="#FFFFFF" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                  OUR VISION
                </h3>
              </div>
              <p style={{ color: '#334155', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>
                {vision.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Cinematic ScrollExpand Experience
  return (
    <section
      id="mission"
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        height: typeof totalSectionHeight === 'number' ? `${totalSectionHeight}px` : totalSectionHeight,
        marginBottom: '0'
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >

        {/* The Expanding Frame via Clip-Path */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: clipPath,
            WebkitClipPath: clipPath,
            overflow: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'clip-path'
          }}
        >
          {/* Background Image */}
          <img
            src="/images/our_mission_vision.png"
            alt="Corporate Leadership"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${imageScale})`,
              willChange: 'transform'
            }}
          />

          {/* Very Subtle Localized Gradient Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.0) 30%, rgba(15,23,42,0.0) 70%, rgba(15,23,42,0.2) 100%)',
              opacity: scrimOpacity,
              willChange: 'opacity'
            }}
          />

          {/* Initial Centered Title */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              opacity: titleOpacity,
              transform: `translateY(${titleTranslateY}px)`,
              background: 'radial-gradient(circle at center, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0) 50%)',
              willChange: 'opacity, transform'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              textShadow: '0 8px 24px rgba(0,0,0,0.5)',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.1
            }}>
              Our Mission &<br />Vision
            </h2>
          </div>

          {/* Expanded Content Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4vh 24px',
              pointerEvents: contentOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div style={{
              maxWidth: '1280px',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              marginTop: 'clamp(20px, 4vh, 48px)'
            }}>

              {/* Mission Premium Panel */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: 'clamp(24px, 3.5vh, 40px)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0',
                opacity: contentOpacity,
                transform: `translateY(${contentTranslateY}px)`,
                willChange: 'opacity, transform'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(196,30,58,0.2)', flexShrink: 0 }}>
                    <Target size={24} color="#FFFFFF" />
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.8vh, 1.6rem)', fontWeight: 600, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                    OUR MISSION
                  </h3>
                </div>
                <p style={{ color: '#334155', lineHeight: 1.55, fontSize: 'clamp(0.95rem, 2vh, 1.1rem)', margin: 0, fontWeight: 400 }}>
                  {mission.description}
                </p>
              </div>

              {/* Vision Premium Panel */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: 'clamp(24px, 3.5vh, 40px)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0',
                opacity: visionOpacity,
                transform: `translateY(${visionTranslateY}px)`,
                willChange: 'opacity, transform'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(196,30,58,0.2)', flexShrink: 0 }}>
                    <Eye size={24} color="#FFFFFF" />
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.8vh, 1.6rem)', fontWeight: 600, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                    OUR VISION
                  </h3>
                </div>
                <p style={{ color: '#334155', lineHeight: 1.55, fontSize: 'clamp(0.95rem, 2vh, 1.1rem)', margin: 0, fontWeight: 400 }}>
                  {vision.description}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
