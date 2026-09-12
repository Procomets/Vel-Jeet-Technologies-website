import React, { useEffect, useState, useRef } from 'react';
import { companyProfileData } from '../data/companyData';

const steps = [
  {
    num: '01',
    title: 'DISCOVER',
    shortDesc: 'Understand your hiring needs.',
    fullDesc: 'We begin by understanding your business, hiring requirements, company culture, role expectations, and the qualities you need in the ideal candidate.'
  },
  {
    num: '02',
    title: 'SOURCE',
    shortDesc: 'Connect with qualified talent.',
    fullDesc: 'Our recruitment team identifies and connects with qualified professionals through targeted sourcing, industry networks, and our talent pool.'
  },
  {
    num: '03',
    title: 'ASSESS',
    shortDesc: 'Evaluate the right candidates.',
    fullDesc: 'We evaluate candidates based on skills, experience, communication, cultural alignment, and suitability for the specific role.'
  },
  {
    num: '04',
    title: 'DELIVER',
    shortDesc: 'Support you through the hiring process.',
    fullDesc: 'We present carefully matched candidates and support you throughout interviews, selection, onboarding, and the hiring process.'
  }
];

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  
  const stepCirclesRef = useRef([]);
  const stepTitlesRef = useRef([]);
  const stepDescsRef = useRef([]);
  
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.opacity = 1;
        containerRef.current.style.transform = 'translateY(0) scale(1)';
      }
      if (headingRef.current) {
        headingRef.current.style.opacity = 1;
        headingRef.current.style.transform = 'translateY(0)';
      }
      if (lineRef.current) {
        if (isMobile) lineRef.current.style.height = '100%';
        else lineRef.current.style.width = '100%';
      }
      stepCirclesRef.current.forEach((el) => {
        if (el) {
          el.style.borderColor = '#C41E3A';
          el.style.color = '#C41E3A';
          el.style.transform = 'scale(1.04)';
        }
      });
      stepTitlesRef.current.forEach((el) => { if (el) el.style.color = '#0F172A'; });
      stepDescsRef.current.forEach((el) => { if (el) el.style.opacity = 1; });
      return;
    }

    let ticking = false;

    const updateScrollEffects = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = 0;
      let focusProgress = 0; 
      
      if (!isMobile) {
        // Desktop: Sticky scroll setup
        // Section is 300vh tall. The sticky container is 100vh tall.
        const totalScrollable = rect.height - windowHeight;
        
        if (rect.top > 0) {
           // Section is entering the viewport
           progress = 0;
           const startEntry = windowHeight * 0.8;
           focusProgress = (startEntry - rect.top) / startEntry;
        } else if (rect.top <= 0 && rect.top > -totalScrollable) {
           // Section is pinned to top of screen.
           progress = -rect.top / totalScrollable;
           focusProgress = 1;
        } else {
           // Section is scrolling out of view
           progress = 1;
           focusProgress = 1;
        }
      } else {
        // Mobile: Normal relative scroll
        const startPoint = windowHeight * 0.85;
        const endPoint = windowHeight * 0.35;
        progress = (startPoint - rect.top) / (startPoint - endPoint);
        focusProgress = progress; 
      }

      progress = Math.max(0, Math.min(1, progress));
      focusProgress = Math.max(0, Math.min(1, focusProgress));

      // 1. Section Focus Effect
      if (containerRef.current) {
        const opacity = 0.85 + (0.15 * focusProgress);
        const scale = 0.97 + (0.03 * focusProgress);
        const translateY = 35 * (1 - focusProgress);
        
        containerRef.current.style.opacity = opacity;
        containerRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
      }

      // 2. Heading Effect
      if (headingRef.current) {
        const headOpacity = focusProgress;
        const headTranslateY = 25 * (1 - focusProgress);
        headingRef.current.style.opacity = headOpacity;
        headingRef.current.style.transform = `translateY(${headTranslateY}px)`;
      }

      // 3. Line Progress
      if (lineRef.current) {
        if (isMobile) {
          lineRef.current.style.height = `${progress * 100}%`;
          lineRef.current.style.width = '100%';
        } else {
          lineRef.current.style.width = `${progress * 100}%`;
          lineRef.current.style.height = '100%';
        }
      }

      // 4. Progressive Step Activation (Direct DOM manipulation, no React state)
      steps.forEach((_, idx) => {
        const threshold = idx * (1 / (steps.length - 1)); // 0, 0.333, 0.666, 1
        const isActive = progress >= (threshold - 0.05); // Trigger slightly before line arrives
        
        const circle = stepCirclesRef.current[idx];
        const title = stepTitlesRef.current[idx];
        const desc = stepDescsRef.current[idx];
        
        if (circle) {
          circle.style.borderColor = isActive ? '#C41E3A' : '#F1F5F9';
          circle.style.color = isActive ? '#C41E3A' : '#94A3B8';
          circle.style.boxShadow = isActive ? '0 0 0 6px rgba(196, 30, 58, 0.05)' : '0 4px 12px rgba(15, 23, 42, 0.03)';
          circle.style.transform = isActive ? 'scale(1.04)' : 'scale(1)';
        }
        
        if (title) {
          title.style.color = isActive ? '#0F172A' : '#64748B';
        }
        
        if (desc) {
          desc.style.opacity = isActive ? 1 : 0.6;
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollEffects();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, prefersReducedMotion]);

  return (
    <section 
      id="how-we-work"
      ref={sectionRef}
      style={{
        height: isMobile ? 'auto' : '200vh', // 200vh provides a balanced, quicker scroll distance
        backgroundColor: '#F8FAFC',
        position: 'relative'
      }}
    >
      <div 
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: isMobile ? '100px 0' : '0'
        }}
      >
        <div 
          ref={containerRef}
          style={{ 
            width: '100%',
            maxWidth: '1280px', 
            margin: '0 auto', 
            padding: '0 24px',
            willChange: 'opacity, transform' // Hardware acceleration
          }}
        >
          <div 
            ref={headingRef}
            style={{ 
              textAlign: 'center', 
              maxWidth: '750px', 
              margin: '0 auto 120px',
              willChange: 'opacity, transform'
            }}
          >
            <span style={{ display: 'inline-block', fontSize: '0.85rem', fontWeight: 600, color: '#C41E3A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', padding: '6px 12px', backgroundColor: '#FEF2F2', borderRadius: '20px' }}>
              How We Work
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.2 }}>
              From Requirement to <span style={{ color: '#C41E3A' }}>Right Hire</span>
            </h2>
          </div>

          {/* TIMELINE CONTAINER */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            
            {/* Track Container */}
            <div 
              style={{
                position: 'absolute',
                zIndex: 0,
                ...(isMobile ? {
                  top: '34px',
                  bottom: '34px',
                  left: '32px',
                  width: '4px'
                } : {
                  top: '32px',
                  left: '12.5%',
                  width: '75%',
                  height: '4px'
                })
              }}
            >
              {/* Base Neutral Line */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: '#E2E8F0', 
                  borderRadius: '4px' 
                }} 
              />
              
              {/* Animated Progress Line */}
              <div 
                ref={lineRef}
                style={{
                  position: 'absolute',
                  top: 0, 
                  left: 0,
                  backgroundColor: '#C41E3A',
                  borderRadius: '4px',
                  willChange: 'width, height',
                  // Transition smoothed out slightly to mask discrete scroll events on non-smooth mice
                  transition: 'width 0.1s linear, height 0.1s linear', 
                  ...(isMobile ? { width: '100%', height: '0%' } : { height: '100%', width: '0%' })
                }}
              />
            </div>

            {/* Steps Grid */}
            <div 
              style={{
                display: isMobile ? 'flex' : 'grid',
                flexDirection: isMobile ? 'column' : 'row',
                gridTemplateColumns: isMobile ? 'none' : 'repeat(4, 1fr)',
                gap: isMobile ? '40px' : '0',
                position: 'relative',
                zIndex: 2
              }}
            >
              {steps.map((step, idx) => {
                const isHovered = hoveredStep === idx;

                return (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'row' : 'column',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      position: 'relative',
                      cursor: isMobile ? 'pointer' : 'default',
                      outline: 'none'
                    }}
                    onMouseEnter={() => !isMobile && setHoveredStep(idx)}
                    onMouseLeave={() => !isMobile && setHoveredStep(null)}
                    onClick={() => isMobile && setHoveredStep(isHovered ? null : idx)}
                    tabIndex={0}
                    onFocus={() => setHoveredStep(idx)}
                    onBlur={() => setHoveredStep(null)}
                  >
                    
                    {/* Floating Hover Card (Desktop only) */}
                    {!isMobile && (
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: `translateX(-50%) translateY(${isHovered ? '-24px' : '-16px'})`,
                          opacity: isHovered ? 1 : 0,
                          visibility: isHovered ? 'visible' : 'hidden',
                          transition: 'all 0.25s ease-out',
                          width: '280px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '12px',
                          padding: '24px',
                          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#C41E3A', marginBottom: '8px' }}>
                          {step.num}
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                          {step.title}
                        </h4>
                        <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                          {step.fullDesc}
                        </p>
                        
                        {/* Downward pointer triangle */}
                        <div 
                          style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#FFFFFF',
                            borderBottom: '1px solid #E2E8F0',
                            borderRight: '1px solid #E2E8F0',
                          }}
                        />
                      </div>
                    )}

                    {/* Step Circle */}
                    <div 
                      ref={el => stepCirclesRef.current[idx] = el}
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: '3px solid #F1F5F9', // Default inactive
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: '#94A3B8', // Default inactive
                        // Provide CSS transition for all JS-injected style changes
                        transition: 'border-color 0.4s ease-out, color 0.4s ease-out, transform 0.4s ease-out, box-shadow 0.4s ease-out',
                        transform: 'scale(1)',
                        margin: isMobile ? '0 24px 0 0' : '0 0 24px 0',
                        position: 'relative',
                        zIndex: 2,
                        flexShrink: 0
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Title and Short Description */}
                    <div style={{ textAlign: isMobile ? 'left' : 'center', paddingTop: isMobile ? '12px' : '0', width: '100%' }}>
                      <h3 
                        ref={el => stepTitlesRef.current[idx] = el}
                        style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          color: '#64748B', 
                          transition: 'color 0.4s ease', 
                          letterSpacing: '0.05em' 
                        }}
                      >
                        {step.title}
                      </h3>
                      
                      <p 
                        ref={el => stepDescsRef.current[idx] = el}
                        style={{ 
                          fontSize: '0.95rem', 
                          color: '#64748B', 
                          lineHeight: 1.6,
                          maxWidth: '220px',
                          margin: isMobile ? '8px 0 0 0' : '12px auto 0',
                          opacity: 0.6,
                          transition: 'opacity 0.4s ease'
                        }}
                      >
                        {step.shortDesc}
                      </p>

                      {/* Mobile Detail Panel (Accordion style) */}
                      {isMobile && (
                        <div
                          style={{
                            maxHeight: isHovered ? '200px' : '0',
                            opacity: isHovered ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-out',
                            marginTop: isHovered ? '16px' : '0'
                          }}
                        >
                          <div style={{
                            backgroundColor: '#FFFFFF',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                          }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#C41E3A', marginBottom: '6px' }}>
                              {step.num}
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#0F172A', lineHeight: 1.5, margin: 0 }}>
                              {step.fullDesc}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
