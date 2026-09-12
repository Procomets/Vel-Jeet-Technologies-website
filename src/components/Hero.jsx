import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onOpenContactModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const isTransitioningRef = useRef(false);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const slides = [
    {
      image: '/images/hero.jpg',
      headline: (
        <>Connecting Businesses <br/>With the <span style={{ color: '#C41E3A' }}>Right Talent</span></>
      ),
      subtext: "Your trusted recruitment partner delivering top-tier talent and end-to-end workforce solutions tailored for growing enterprises."
    },
    {
      image: '/images/executive_search.jpg',
      headline: (
        <>Building Teams That <br/><span style={{ color: '#C41E3A' }}>Drive Business Forward</span></>
      ),
      subtext: "Empowering your organization with leadership and skilled professionals who align with your vision and strategic goals."
    },
    {
      image: '/images/hr_outsourcing.jpg',
      headline: (
        <>Your Workforce. <br/><span style={{ color: '#C41E3A' }}>Our Expertise.</span></>
      ),
      subtext: "From volume hiring to niche roles, we simplify recruitment and compliance so you can focus on what matters most—growth."
    }
  ];

  const kpis = [
    {
      value: '500+',
      label: 'Placements Delivered',
      subtext: 'Across IT, BPO & Manufacturing',
      color: '#C41E3A'
    },
    {
      value: '98.5%',
      label: 'Retention Rate',
      subtext: 'Long-Term Candidate Fit',
      color: '#0F172A'
    },
    {
      value: '100%',
      label: 'Statutory Compliance',
      subtext: 'PF, ESI & Labor Standards',
      color: '#C41E3A'
    },
    {
      value: '50+',
      label: 'Enterprise Clients',
      subtext: 'Startups & Corporate Partners',
      color: '#0F172A'
    }
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      navigateCarousel('next');
    }, 5500); // 5.5 seconds
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const navigateCarousel = (action) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    
    setCurrentIndex(prev => {
      let nextIndex = prev;
      if (action === 'next') nextIndex = (prev + 1) % slides.length;
      else if (action === 'prev') nextIndex = prev === 0 ? slides.length - 1 : prev - 1;
      else if (typeof action === 'number') nextIndex = action;
      return nextIndex;
    });

    startTimer();

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 700);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    // Horizontal swipe logic
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) navigateCarousel('next');
      else navigateCarousel('prev');
    }
    
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <section id="hero" style={{ position: 'relative', width: '100%', backgroundColor: '#FFFFFF' }}>
      
      {/* Animated Hero Carousel Wrapper */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div 
              key={index}
              style={{
                gridArea: '1 / 1',
                position: 'relative',
                padding: '190px 0 140px',
                minHeight: '560px',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 700ms ease-out',
                zIndex: isActive ? 2 : 1,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              {/* Background Image Layer */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 10%, rgba(255, 255, 255, 0.91) 4%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.10) 50%), url('${slide.image}')`,
                  backgroundPosition: 'top right',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  transform: prefersReducedMotion ? 'none' : (isActive ? 'scale(1)' : 'scale(1.03)'),
                  transition: 'transform 700ms ease-out',
                  zIndex: -1,
                }}
              />
              
              {/* Text Content */}
              <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
                <div style={{ maxWidth: '650px', paddingTop: '-60px' }}>
                  
                  {/* Headline */}
                  <h1 
                    style={{
                      fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                      fontWeight: 900,
                      color: '#0F172A',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      marginBottom: '22px',
                      opacity: isActive ? 1 : 0,
                      transform: prefersReducedMotion 
                        ? 'none' 
                        : (isActive ? 'translateY(0)' : 'translateY(24px)'),
                      transition: isActive 
                        ? 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                        : 'opacity 300ms ease-out, transform 300ms ease-out'
                    }}
                  >
                    {slide.headline}
                  </h1>

                  {/* Subtext */}
                  <p 
                    style={{
                      color: '#475569',
                      fontSize: '1.125rem',
                      lineHeight: 1.6,
                      maxWidth: '560px',
                      margin: '0 auto',
                      fontWeight: 400,
                      marginBottom: '36px',
                      opacity: isActive ? 1 : 0,
                      transform: prefersReducedMotion 
                        ? 'none' 
                        : (isActive ? 'translateY(0)' : 'translateY(24px)'),
                      transition: isActive 
                        ? 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 200ms'
                        : 'opacity 300ms ease-out, transform 300ms ease-out'
                    }}
                  >
                    {slide.subtext}
                  </p>

                  {/* CTA Buttons */}
                  <div 
                    style={{ 
                      display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center',
                      opacity: isActive ? 1 : 0,
                      transform: prefersReducedMotion 
                        ? 'none' 
                        : (isActive ? 'translateY(0)' : 'translateY(24px)'),
                      transition: isActive 
                        ? 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 300ms'
                        : 'opacity 300ms ease-out, transform 300ms ease-out'
                    }}
                  >
                    <button 
                      className="btn-primary-red"
                      onClick={onOpenContactModal}
                      style={{
                        padding: '16px 32px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '8px'
                      }}
                    >
                      Hire Top Talent Now
                      <ArrowRight size={20} />
                    </button>

                    <a 
                      href="#services"
                      className="btn-secondary-dark"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px', 
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '8px'
                      }}
                    >
                      Explore Services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Dots */}
        <div 
          style={{
            position: 'absolute',
            bottom: '125px', 
            left: 0,
            right: 0,
            zIndex: 5,
            pointerEvents: 'none'
          }}
        >
          <div 
            style={{ 
              maxWidth: '1280px', 
              margin: '0 auto', 
              padding: '0 24px', 
              display: 'flex', 
              gap: '10px', 
              pointerEvents: 'auto' 
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => navigateCarousel(i)}
                style={{
                  width: currentIndex === i ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentIndex === i ? '#C41E3A' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                  padding: 0
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Floating Center Bottom White KPI Card */}
      <div 
        style={{
          maxWidth: '1180px',
          width: 'calc(100% - 48px)',
          margin: '-20px auto 60px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div 
          className="kpi-white-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px 36px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12), 0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E8F0'
          }}
        >
          <div 
            className="kpi-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              textAlign: 'center',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            {kpis.map((kpi, index) => (
              <div 
                key={index}
                className="kpi-item"
                style={{
                  borderRight: index !== kpis.length - 1 ? '1px solid #E2E8F0' : 'none',
                  paddingRight: index !== kpis.length - 1 ? '16px' : '0'
                }}
              >
                <div 
                  style={{
                    color: kpi.color,
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: '6px'
                  }}
                >
                  {kpi.value}
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#0F172A', lineHeight: 1.2 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '3px' }}>
                  {kpi.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
