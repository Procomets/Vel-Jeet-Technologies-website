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
        <>Connecting Businesses <br />With the <span style={{ color: isMobile ? '#FF4D6D' : '#C41E3A' }}>Right Talent</span></>
      ),
      subtext: "Your trusted recruitment partner delivering top-tier talent and end-to-end workforce solutions tailored for growing enterprises."
    },
    {
      image: '/images/executive_search.jpg',
      headline: (
        <>Building Teams That <br /><span style={{ color: isMobile ? '#FF4D6D' : '#C41E3A' }}>Drive Business Forward</span></>
      ),
      subtext: "Empowering your organization with leadership and skilled professionals who align with your vision and strategic goals."
    },
    {
      image: '/images/hr_outsourcing.jpg',
      headline: (
        <>Your Workforce. <br /><span style={{ color: isMobile ? '#FF4D6D' : '#C41E3A' }}>Our Expertise.</span></>
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
                  backgroundImage: isMobile
                    ? `linear-gradient(180deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.85) 100%), url('${slide.image}')`
                    : `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 10%, rgba(255, 255, 255, 0.91) 4%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.10) 50%), url('${slide.image}')`,
                  backgroundPosition: isMobile ? 'center' : 'top right',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  transform: prefersReducedMotion ? 'none' : (isActive ? 'scale(1)' : 'scale(1.03)'),
                  transition: 'transform 700ms ease-out',
                  zIndex: -1,
                }}
              />

              {/* Text Content */}
              <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative' , marginBottom:'30px'}}>
                <div style={{ maxWidth: '650px', transform: 'translateY(-50px)', marginTop:'-40px' }}>

                  {/* Headline */}
                  <h1
                    style={{
                      fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                      fontWeight: 900,
                      color: isMobile ? '#FFFFFF' : '#0F172A',
                      lineHeight: 1.1,
                      letterSpacing: '0.015em',
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
                      color: isMobile ? '#FFFFFF' : '#475569',
                      fontSize: '1.125rem',
                      lineHeight: 1.6,
                      maxWidth: '560px',
                      margin: '0 auto',
                      fontWeight: 400,
                      marginBottom: '36px',
                      marginLeft:'1px',
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
                        borderRadius: '8px',
                        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.15)' : '#0F172A',
                        color: '#FFFFFF',
                        border: isMobile ? '1px solid rgba(255, 255, 255, 0.35)' : 'none'
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

      {/* KPI Section: Floating Card on Desktop, Independent Full-Width Section on Mobile */}
      <div className="hero-kpi-container">
        <div className="kpi-card-inner">
          <div className="kpi-grid-container">
            {kpis.map((kpi, index) => (
              <div key={index} className="kpi-item-card">
                <div className="kpi-val-text" style={{ color: kpi.color }}>
                  {kpi.value}
                </div>
                <div className="kpi-lbl-text">
                  {kpi.label}
                </div>
                <div className="kpi-sub-text">
                  {kpi.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .hero-kpi-container {
            max-width: 1180px;
            width: calc(100% - 48px);
            margin: -20px auto 60px;
            position: relative;
            z-index: 10;
          }

          .kpi-card-inner {
            background-color: #FFFFFF;
            border-radius: 16px;
            padding: 32px 36px;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12), 0 4px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid #E2E8F0;
          }

          .kpi-grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            text-align: center;
            gap: 16px;
            align-items: center;
          }

          .kpi-item-card {
            border-right: 1px solid #E2E8F0;
            padding-right: 16px;
          }

          .kpi-item-card:last-child {
            border-right: none;
            padding-right: 0;
          }

          .kpi-val-text {
            font-size: 2.4rem;
            font-weight: 900;
            line-height: 1;
            letter-spacing: 0.015em;
            margin-bottom: 2px;
          }

          .kpi-lbl-text {
            font-size: 0.94rem;
            font-weight: 700;
            color: #0F172A;
            line-height: 1.15;
          }

          .kpi-sub-text {
            font-size: 0.78rem;
            color: #64748B;
            margin-top: 1px;
            line-height: 1.2;
          }

          @media (max-width: 768px) {
            .hero-kpi-container {
              width: 100%;
              max-width: 100%;
              margin: 0;
              padding: 24px 16px;
              background-color: #FFFFFF;
              border-top: 1px solid #E2E8F0;
              border-bottom: 1px solid #E2E8F0;
              box-sizing: border-box;
            }

            .kpi-card-inner {
              background-color: transparent !important;
              border-radius: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              border: none !important;
            }

            .kpi-grid-container {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 16px 12px !important;
            }

            .kpi-item-card {
              border-right: none !important;
              padding-right: 0 !important;
            }

            .kpi-val-text {
              font-size: 2rem;
              margin-bottom: 2px;
            }

            .kpi-lbl-text {
              font-size: 0.88rem;
              line-height: 1.15;
            }

            .kpi-sub-text {
              font-size: 0.74rem;
              margin-top: 1px;
              line-height: 1.2;
            }
          }
        `}
      </style>
    </section>
  );
}
