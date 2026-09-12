import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import LineSidebar from './LineSidebar';
import { companyProfileData } from '../data/companyData';

// Hook for safe SSR/Hydration measurements
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Services() {
  const { services } = companyProfileData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef(null);

  // Check window size and reduced motion for accessibility
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

  // Intersection Observer for Premium Entrance Reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0, rootMargin: "-100px 0px" }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isMobile = windowWidth < 768;
  const shouldUseScrollAnimation = !prefersReducedMotion; // Re-enabled for mobile as requested

  // Decrease track height on mobile for quicker swipe progression
  const scrollTrackHeight = typeof window !== 'undefined' ? window.innerHeight * (isMobile ? 3 : 6) : 6000;
  const totalSectionHeight = shouldUseScrollAnimation ? scrollTrackHeight + (typeof window !== 'undefined' ? window.innerHeight : 1000) : 'auto';

  useIsomorphicLayoutEffect(() => {
    if (!shouldUseScrollAnimation) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            
            // rect.top is 0 when the sticky container hits the top of the screen
            const scrollPastPin = -rect.top;
            
            if (scrollPastPin >= 0 && scrollPastPin <= scrollTrackHeight) {
              const progress = scrollPastPin / scrollTrackHeight; // 0 to 1
              setScrollProgress(progress);
              
              // Map 0-1 progress to 0-4 index
              const calculatedIndex = Math.min(services.length - 1, Math.floor(progress * services.length));
              setActiveIndex(calculatedIndex);
            } else if (scrollPastPin < 0) {
              setScrollProgress(0);
              setActiveIndex(0);
            } else if (scrollPastPin > scrollTrackHeight) {
              setScrollProgress(1);
              setActiveIndex(services.length - 1);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize position instantly on load
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldUseScrollAnimation, scrollTrackHeight, services.length]);

  // Mobile Autoplay - can be removed now that scroll animation is re-enabled, but we will leave it commented just in case.
  /*
  useEffect(() => {
    if (!isMobile || shouldUseScrollAnimation) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, [isMobile, shouldUseScrollAnimation, services.length]);
  */

  const handleSelectService = (index) => {
    // If we click while sticky, smooth scroll to that specific scroll progress offset
    if (shouldUseScrollAnimation && sectionRef.current) {
       const sectionTop = sectionRef.current.offsetTop;
       const targetScroll = sectionTop + (index / services.length) * scrollTrackHeight + 10;
       window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
       setActiveIndex(index);
    }
  };

  // The premium Hero 6 transition easing, slightly lengthened for smoothness
  const transitionCSS = prefersReducedMotion 
    ? 'opacity 0.4s ease' 
    : 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';

  // Entrance Animation Helper
  const getEntranceStyle = (delay, type = 'up') => {
    if (prefersReducedMotion) {
      return {
        opacity: hasEntered ? 1 : 0,
        transition: `opacity 500ms ease ${!isMobile ? delay : 0}ms`
      };
    }
    
    if (isMobile) {
      return {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? 'translateY(0)' : 'translateY(15px)',
        transition: `opacity 500ms ease, transform 500ms ease`
      };
    }

    let initialTransform = 'translateY(30px)';
    if (type === 'right') initialTransform = 'translateX(-18px)';
    if (type === 'image') initialTransform = 'translateX(35px) scale(1.03)';

    return {
      opacity: hasEntered ? 1 : 0,
      transform: hasEntered ? 'translate(0) scale(1)' : initialTransform,
      transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
    };
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      style={{
        backgroundColor: '#F8FAFC', // Very light neutral background
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        height: typeof totalSectionHeight === 'number' ? `${totalSectionHeight}px` : totalSectionHeight
      }}
    >
      {/* Sticky Container */}
      <div
        style={{
          position: shouldUseScrollAnimation ? 'sticky' : 'relative',
          top: shouldUseScrollAnimation ? '80px' : 0, 
          height: shouldUseScrollAnimation ? 'calc(100vh - 80px)' : 'auto',
          padding: shouldUseScrollAnimation ? 'max(2vh, 16px) 0' : (isMobile ? '40px 0 60px 0' : '100px 0'), 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: isMobile ? '0' : '0 24px', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          
          <div className="hero-6-container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flex: 1, minHeight: 0, minWidth: 0, gap: isMobile ? '16px' : '0' }}>
            
            {/* LEFT COLUMN: Navigation & Context */}
            <div className="hero-6-left" style={{ display: 'flex', flexDirection: 'column', height: isMobile ? 'auto' : '100%', minWidth: 0 }}>
              
              {/* Section Context */}
              <div style={{ marginBottom: isMobile ? '16px' : 'min(3vh, 16px)' }}>
                <span style={{ 
                  display: 'inline-block', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#C41E3A', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  marginBottom: 'min(1vh, 8px)',
                  padding: isMobile ? '0 24px' : '0',
                  ...getEntranceStyle(0, 'up')
                }}>
                  Our HR Solutions
                </span>
                <h2 style={{ 
                  fontSize: isMobile ? 'clamp(32px, 8vw, 38px)' : 'clamp(2.1rem, 5vh, 2.75rem)', 
                  fontWeight: 900, 
                  color: '#0F172A', 
                  lineHeight: isMobile ? 1.1 : 1.2, 
                  textAlign: 'left',
                  padding: isMobile ? '0 24px' : '0',
                  marginBottom: isMobile ? '16px' : 'min(1.5vh, 12px)',
                  ...getEntranceStyle(100, 'up')
                }}>
                  Building Teams That <br/>Drive Business Forward
                </h2>
                {!isMobile && (
                  <p style={{ 
                    color: '#64748B', 
                    fontSize: 'clamp(1.05rem, 2.5vh, 1.15rem)', 
                    lineHeight: 1.5, 
                    maxWidth: '500px', 
                    margin: 0,
                    ...getEntranceStyle(180, 'up')
                  }}>
                    End-to-end talent and workforce solutions designed to help businesses attract, develop, and retain exceptional people.
                  </p>
                )}
              </div>

              {/* Service Navigation (Vertical Desktop, Horizontal Mobile) */}
              <div style={{ 
                position: 'relative', 
                display: 'flex', 
                gap: isMobile ? '0' : '28px', 
                marginTop: isMobile ? '0' : 'min(2vh, 12px)', 
                flex: isMobile ? '0 0 auto' : 1, 
                minHeight: 0,
                minWidth: 0,
                paddingBottom: isMobile ? '12px' : 'max(4vh, 32px)',
                marginBottom: isMobile ? '16px' : '0'
              }}>
                
                {/* Vertical Progress Line (Desktop Only) */}
                {!isMobile && (
                  <div style={{ 
                    width: '2px', 
                    backgroundColor: '#E2E8F0', 
                    position: 'relative', 
                    borderRadius: '2px', 
                    flexShrink: 0, 
                    height: '100%',
                    transform: hasEntered ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transition: `transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 200ms`
                  }}>
                    {/* Animated Active Thumb */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: `${scrollProgress * (100 - (100 / services.length))}%`,
                        left: '-1px', 
                        width: '4px',
                        height: `${100 / services.length}%`,
                        backgroundColor: '#C41E3A',
                        borderRadius: '4px',
                        willChange: 'top'
                      }}
                    />
                  </div>
                )}
                
                {/* Service List Navigation */}
                {isMobile ? (
                  <div className="mobile-scroll-container" style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    width: '100%', 
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    gap: '12px',
                    padding: '0 16px 16px 16px',
                    scrollbarWidth: 'none', /* Hide scrollbar Firefox */
                    msOverflowStyle: 'none'
                  }}>
                    {services.map((service, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <button 
                          key={service.id}
                          onClick={() => handleSelectService(index)}
                          style={{
                            flex: '0 0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: isActive ? '#FEF2F2' : '#F1F5F9',
                            borderRadius: '24px',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            outline: 'none'
                          }}
                        >
                          <span style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 600, 
                            color: isActive ? '#C41E3A' : '#94A3B8',
                            transition: transitionCSS
                          }}>
                            0{index + 1}
                          </span>
                          <span style={{
                            fontSize: '0.95rem',
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? '#0F172A' : '#64748B',
                            transition: transitionCSS,
                            whiteSpace: 'nowrap'
                          }}>
                            {service.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div style={{ marginLeft: '16px', height: '100%', flex: 1 }}>
                    <LineSidebar
                      items={services.map(s => s.title)}
                      activeIndex={activeIndex}
                      onItemClick={(index) => handleSelectService(index)}
                      accentColor="#C41E3A"
                      textColor="#64748B"
                      markerColor="#E2E8F0"
                      defaultActive={0}
                      showIndex={true}
                      showMarker={false}
                      maxShift={24}
                      fontSize={1.15}
                      itemGap={0}
                    />
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: Active Visual Showcase */}
            <div 
              className="hero-6-right"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gridTemplateRows: '1fr',
                position: 'relative',
                flex: 1,
                minHeight: 0,
                width: '100%',
                padding: isMobile ? '0 16px' : '0',
                boxSizing: 'border-box'
              }}
            >
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div 
                    key={service.id + '-panel'}
                    style={{
                      gridColumn: '1 / 2',
                      gridRow: '1 / 2',
                      alignSelf: isMobile ? 'start' : 'center', 
                      opacity: isActive ? 1 : 0,
                      transform: isActive 
                        ? 'translate(0)' 
                        : (prefersReducedMotion ? 'none' : (isMobile ? 'translateY(15px)' : 'translateX(30px)')),
                      transition: isMobile ? 'all 0.4s ease' : transitionCSS,
                      visibility: isActive ? 'visible' : 'hidden',
                      pointerEvents: isActive ? 'auto' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: isMobile ? '12px' : 'min(3vh, 24px)', 
                      backgroundColor: '#FFFFFF',
                      padding: isMobile ? '0' : 'min(3.5vh, 28px)', 
                      borderRadius: isMobile ? '20px' : 'min(3vh, 24px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                      border: '1px solid #F1F5F9',
                      width: '100%',
                      margin: '0',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      minHeight: 0
                    }}
                  >
                    {/* Image */}
                    <div style={{ 
                      borderRadius: isMobile ? '20px 20px 0 0' : 'min(2vh, 16px)', 
                      overflow: 'hidden', 
                      height: 'auto', 
                      aspectRatio: '16/9',
                      backgroundColor: '#F8FAFC', 
                      flexShrink: 0,
                      width: '100%',
                      ...getEntranceStyle(150, 'image')
                    }}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          objectPosition: service.id === 'permanent-staffing' || service.id === 'executive-search' ? 'center 15%' : 'center'
                        }} 
                      />
                    </div>
                    
                    {/* Content */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      padding: isMobile ? '12px 16px 16px 16px' : '0',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      flex: 1,
                      minHeight: 0,
                      overflowY: 'auto',
                      ...getEntranceStyle(250, 'up')
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : 'min(2vh, 16px)', marginBottom: isMobile ? '8px' : 'min(2vh, 16px)' }}>
                        <span style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 900, color: '#C41E3A', padding: isMobile ? '4px 8px' : '6px 12px', backgroundColor: '#FEF2F2', borderRadius: '8px' }}>
                          0{index + 1}
                        </span>
                        <h3 style={{ fontSize: isMobile ? '1.3rem' : 'clamp(1.6rem, 4vh, 2rem)', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                          {service.title}
                        </h3>
                      </div>
                      
                      <p style={{ fontSize: isMobile ? '0.9rem' : 'clamp(1.05rem, 2.5vh, 1.15rem)', color: '#475569', lineHeight: isMobile ? 1.4 : 1.6, marginBottom: isMobile ? '12px' : 'min(3vh, 24px)' }}>
                        {service.fullDesc}
                      </p>
                      
                      {/* Deliverables / Capabilities List */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: isMobile ? '8px' : 'min(1.5vh, 12px)' }}>
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: isMobile ? '0.85rem' : 'clamp(0.95rem, 2vh, 1.05rem)', color: '#334155', fontWeight: 400 }}>
                            <div style={{ width: isMobile ? '18px' : '22px', height: isMobile ? '18px' : '22px', borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                              <Check size={isMobile ? 10 : 12} />
                            </div>
                            <span style={{ lineHeight: 1.3 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      <style>
        {`
          .hero-6-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: stretch;
          }
          
          @media (max-width: 992px) {
            .hero-6-container {
              grid-template-columns: 1fr;
              gap: 40px;
            }
          }
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          .mobile-scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}
