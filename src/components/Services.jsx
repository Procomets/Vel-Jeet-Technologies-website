import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Services({ onOpenContactModal }) {
  const { services } = companyProfileData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const showcaseTrackRef = useRef(null);
  const tabsRef = useRef(null);
  const isClicking = useRef(false);

  // Touch gesture state for horizontal swipe on mobile
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll mobile horizontal tabs to keep active tab centered
  useEffect(() => {
    if (isMobile && tabsRef.current) {
      const activeTabBtn = tabsRef.current.querySelector('.mobile-tab-btn.active');
      if (activeTabBtn) {
        activeTabBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex, isMobile]);

  // Scroll-driven active service update starting when left section touches top with 20px padding
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (isClicking.current || !showcaseTrackRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!showcaseTrackRef.current) return;
          const rect = showcaseTrackRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const stickyTopOffset = 40; // 40px top padding when sticky touches top
          const totalScrollable = rect.height - windowHeight;
          const scrollPastPin = stickyTopOffset - rect.top;

          if (scrollPastPin >= 0 && scrollPastPin <= totalScrollable) {
            const progress = scrollPastPin / totalScrollable;
            const calculatedIndex = Math.min(
              services.length - 1,
              Math.max(0, Math.floor(progress * services.length))
            );
            setActiveIndex(calculatedIndex);
          } else if (scrollPastPin < 0) {
            setActiveIndex(0);
          } else if (scrollPastPin > totalScrollable) {
            setActiveIndex(services.length - 1);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, services.length]);

  const handleSelectService = (index) => {
    setActiveIndex(index);

    if (!isMobile && showcaseTrackRef.current) {
      isClicking.current = true;
      const rect = showcaseTrackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyTopOffset = 40;
      const totalScrollable = rect.height - windowHeight;
      const stepFraction = index / (services.length - 1);
      
      // Calculate target scroll position so section pins at exact step
      const targetScrollY = window.pageYOffset + rect.top - stickyTopOffset + (stepFraction * totalScrollable);
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });

      setTimeout(() => {
        isClicking.current = false;
      }, 700);
    }
  };

  const handlePrevService = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNextService = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX || !touchStartY) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Detect horizontal swipe if horizontal displacement exceeds vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX > 0) {
        handleNextService();
      } else {
        handlePrevService();
      }
    }

    setTouchStartX(0);
    setTouchStartY(0);
  };

  const activeService = services[activeIndex] || services[0];

  return (
    <section 
      id="services" 
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      style={{
        backgroundColor: '#F8FAFC',
        padding: '60px 0 0 0',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          boxSizing: 'border-box'
        }}
      >
        {/* Section Header */}
        <div 
          style={{
            textAlign: 'center',
            maxWidth: '1250px',
            width: '100%',
            margin: '0 auto 36px auto'
          }}
        >
          <h2 
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.35rem)',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.2,
              letterSpacing: '0.015em',
              margin: '0 0 10px 0',
              whiteSpace: 'nowrap'
            }}
          >
            Building Teams That Drive Business Forward
          </h2>

          <p 
            style={{
              fontSize: 'clamp(0.85rem, 1.22vw, 1.025rem)',
              color: '#64748B',
              lineHeight: 1.5,
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            End-to-end talent and workforce solutions designed to help enterprises attract, deploy, and retain high-performing teams.
          </p>
        </div>

        {/* SHOWCASE TRACK */}
        <div 
          ref={showcaseTrackRef}
          style={{
            height: isMobile ? 'auto' : '220vh',
            position: 'relative',
            width: '100%'
          }}
        >
          <div 
            style={{
              position: isMobile ? 'relative' : 'sticky',
              top: isMobile ? 'auto' : '40px',
              paddingBottom: isMobile ? '40px' : '60px',
              boxSizing: 'border-box'
            }}
          >
            {isMobile ? (
              /* MOBILE SWIPABLE CARD CONTAINER */
              <div className="mobile-services-wrapper">
                {/* Horizontal Category Tabs */}
                <div ref={tabsRef} className="mobile-services-tabs-container">
                  {services.map((service, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleSelectService(index)}
                        className={`mobile-tab-btn ${isActive ? 'active' : ''}`}
                      >
                        <span className="mobile-tab-num">{index + 1}</span>
                        <span className="mobile-tab-title">{service.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Swipable Service Card */}
                <div className="mobile-service-card-container">
                  <div
                    key={activeService.id}
                    className="single-service-card animate-card-fade"
                    style={{ userSelect: 'none' }}
                  >
                    {/* Image */}
                    <div className="single-card-img-container">
                      <img 
                        src={activeService.image} 
                        alt={activeService.title} 
                        className="single-card-img"
                      />
                      <div className="mobile-card-badge">
                        {activeIndex + 1} / {services.length}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="single-card-body">
                      <h3 className="single-card-title">
                        {activeService.title}
                      </h3>

                      <p className="single-card-desc">
                        {activeService.fullDesc}
                      </p>

                      {/* Key Deliverables */}
                      {activeService.deliverables && activeService.deliverables.length > 0 && (
                        <div style={{ marginBottom: '18px' }}>
                          <div className="section-sub-heading">
                            Key Deliverables
                          </div>
                          <div className="deliverables-grid">
                            {activeService.deliverables.map((item, dIdx) => (
                              <div key={dIdx} className="deliverable-item">
                                <div className="deliverable-check">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Target Roles Tags */}
                      {activeService.targetRoles && (
                        <div style={{ marginBottom: '22px' }}>
                          <div className="section-sub-heading">
                            Target Roles
                          </div>
                          <div className="target-roles-tags">
                            {activeService.targetRoles.split(',').map((role, rIdx) => (
                              <span key={rIdx} className="target-role-tag">
                                {role.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div>
                        <button
                          onClick={() => onOpenContactModal && onOpenContactModal()}
                          className="service-btn-primary"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          <span>Inquire About {activeService.title}</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Navigation Controls: Arrows & Indicators */}
                  <div className="mobile-carousel-controls">
                    <button 
                      onClick={handlePrevService}
                      className="mobile-nav-arrow"
                      aria-label="Previous Service"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="mobile-carousel-dots">
                      {services.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIndex(idx)}
                          className={`carousel-dot ${activeIndex === idx ? 'active' : ''}`}
                          aria-label={`Go to service ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={handleNextService}
                      className="mobile-nav-arrow"
                      aria-label="Next Service"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="mobile-swipe-hint">
                    ‹ Swipe left or right to explore services ›
                  </div>
                </div>
              </div>
            ) : (
              /* DESKTOP 2-COLUMN GRID */
              <div className="services-single-showcase-grid">
                
                {/* LEFT SIDEBAR */}
                <div className="services-left-sidebar">
                  <div className="sidebar-card-box">
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: '#94A3B8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '12px',
                        paddingLeft: '12px'
                      }}>
                        Service Capabilities
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {services.map((service, index) => {
                          const isActive = activeIndex === index;
                          return (
                            <button
                              key={service.id}
                              onClick={() => handleSelectService(index)}
                              className={`sidebar-item-btn ${isActive ? 'active' : ''}`}
                            >
                              <span className="sidebar-num-badge">
                                {index + 1}
                              </span>
                              <span className="sidebar-item-title">
                                {service.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Quick Contact Box */}
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      textAlign: 'left'
                    }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                        Need Custom Hiring?
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, marginBottom: '12px' }}>
                        Speak directly with our staffing specialists for a tailored solution.
                      </div>
                      <button
                        onClick={() => onOpenContactModal && onOpenContactModal()}
                        style={{
                          width: '100%',
                          backgroundColor: '#C41E3A',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        Get In Touch <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* RIGHT SIDE: SINGLE SERVICE CARD DISPLAYED AT A TIME */}
                <div className="services-right-single-view">
                  <div
                    key={activeService.id}
                    className="single-service-card animate-card-fade"
                  >
                    {/* Image */}
                    <div className="single-card-img-container">
                      <img 
                        src={activeService.image} 
                        alt={activeService.title} 
                        className="single-card-img"
                      />
                    </div>

                    {/* Body */}
                    <div className="single-card-body">
                      <h3 className="single-card-title">
                        {activeService.title}
                      </h3>

                      <p className="single-card-desc">
                        {activeService.fullDesc}
                      </p>

                      {/* Key Solution Deliverables Checklist */}
                      {activeService.deliverables && activeService.deliverables.length > 0 && (
                        <div style={{ marginBottom: '18px' }}>
                          <div className="section-sub-heading">
                            Key Deliverables
                          </div>
                          <div className="deliverables-grid">
                            {activeService.deliverables.map((item, dIdx) => (
                              <div key={dIdx} className="deliverable-item">
                                <div className="deliverable-check">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Target Roles Pill Tags */}
                      {activeService.targetRoles && (
                        <div style={{ marginBottom: '22px' }}>
                          <div className="section-sub-heading">
                            Target Roles
                          </div>
                          <div className="target-roles-tags">
                            {activeService.targetRoles.split(',').map((role, rIdx) => (
                              <span key={rIdx} className="target-role-tag">
                                {role.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div>
                        <button
                          onClick={() => onOpenContactModal && onOpenContactModal()}
                          className="service-btn-primary"
                        >
                          <span>Inquire About {activeService.title}</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>

      {/* Styled Layout CSS */}
      <style>
        {`
          .services-single-showcase-grid {
            display: grid;
            grid-template-columns: 310px 1fr;
            gap: 36px;
            align-items: stretch;
          }

          .services-left-sidebar {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .sidebar-card-box {
            background-color: #FFFFFF;
            border-radius: 16px;
            border: 1px solid #E2E8F0;
            padding: 24px;
            box-shadow: 0 10px 25px rgba(15, 23, 42, 0.03);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
          }

          .sidebar-item-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 11px 14px;
            border-radius: 10px;
            border: 1px solid transparent;
            background-color: transparent;
            text-align: left;
            cursor: pointer;
            transition: all 0.25s ease;
            outline: none;
          }

          .sidebar-item-btn:hover {
            background-color: #F8FAFC;
          }

          .sidebar-item-btn.active {
            background-color: #FEF2F2;
            border-color: #FCA5A5;
          }

          .sidebar-num-badge {
            font-size: 0.78rem;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 6px;
            background-color: #F1F5F9;
            color: #64748B;
            transition: all 0.25s ease;
          }

          .sidebar-item-btn.active .sidebar-num-badge {
            background-color: #C41E3A;
            color: #FFFFFF;
          }

          .sidebar-item-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: #475569;
            transition: color 0.25s ease;
          }

          .sidebar-item-btn.active .sidebar-item-title {
            color: #0F172A;
            font-weight: 700;
          }

          /* Single Service View Area */
          .services-right-single-view {
            width: 100%;
          }

          .single-service-card {
            background-color: #FFFFFF;
            border-radius: 20px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 12px 35px rgba(15, 23, 42, 0.05);
            overflow: hidden;
          }

          .animate-card-fade {
            animation: cardFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes cardFadeIn {
            from {
              opacity: 0.6;
              transform: scale(0.985);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .single-card-img-container {
            width: 100%;
            height: 250px;
            overflow: hidden;
            position: relative;
            background-color: #E2E8F0;
          }

          .single-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .single-card-body {
            padding: 28px 30px;
          }

          .single-card-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0 0 10px 0;
            line-height: 1.25;
          }

          .single-card-desc {
            font-size: 0.98rem;
            color: #475569;
            line-height: 1.6;
            margin: 0 0 20px 0;
          }

          .section-sub-heading {
            font-size: 0.76rem;
            font-weight: 700;
            color: #94A3B8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
          }

          .deliverables-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .deliverable-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            background-color: #F8FAFC;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid #F1F5F9;
            font-size: 0.86rem;
            color: #334155;
            font-weight: 500;
          }

          .deliverable-check {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #FEF2F2;
            color: #C41E3A;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .target-roles-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .target-role-tag {
            font-size: 0.8rem;
            font-weight: 600;
            color: #475569;
            background-color: #F1F5F9;
            padding: 4px 10px;
            border-radius: 20px;
          }

          .service-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background-color: #0F172A;
            color: #FFFFFF;
            padding: 11px 22px;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.25s ease;
            outline: none;
          }

          .service-btn-primary:hover {
            background-color: #C41E3A;
            box-shadow: 0 6px 20px rgba(196, 30, 58, 0.25);
          }

          /* MOBILE STYLING */
          .mobile-services-wrapper {
            width: 100%;
          }

          .mobile-services-tabs-container {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding: 4px 4px 14px 4px;
            margin-bottom: 12px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .mobile-services-tabs-container::-webkit-scrollbar {
            display: none;
          }

          .mobile-tab-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 30px;
            border: 1px solid #E2E8F0;
            background-color: #FFFFFF;
            color: #475569;
            font-size: 0.83rem;
            font-weight: 600;
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
          }

          .mobile-tab-btn.active {
            background-color: #FEF2F2;
            border-color: #FCA5A5;
            color: #C41E3A;
            font-weight: 700;
          }

          .mobile-tab-num {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #F1F5F9;
            color: #64748B;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.72rem;
            font-weight: 800;
          }

          .mobile-tab-btn.active .mobile-tab-num {
            background-color: #C41E3A;
            color: #FFFFFF;
          }

          .mobile-service-card-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .mobile-card-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(4px);
            color: #FFFFFF;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.05em;
          }

          .mobile-carousel-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 14px;
            background-color: #FFFFFF;
            border-radius: 16px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          }

          .mobile-nav-arrow {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            border: 1px solid #E2E8F0;
            background-color: #F8FAFC;
            color: #0F172A;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .mobile-nav-arrow:active {
            background-color: #FEF2F2;
            color: #C41E3A;
            border-color: #FCA5A5;
          }

          .mobile-carousel-dots {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 4px;
            border: none;
            background-color: #CBD5E1;
            padding: 0;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .carousel-dot.active {
            width: 24px;
            background-color: #C41E3A;
          }

          .mobile-swipe-hint {
            text-align: center;
            font-size: 0.78rem;
            color: #94A3B8;
            font-weight: 500;
            letter-spacing: 0.02em;
          }

          @media (max-width: 992px) {
            #services h2, #services p {
              white-space: normal !important;
            }

            .single-card-body {
              padding: 20px 18px;
            }

            .single-card-img-container {
              height: 210px;
            }

            .deliverables-grid {
              grid-template-columns: 1fr;
            }

            .single-card-title {
              font-size: 1.35rem;
            }

            .single-card-desc {
              font-size: 0.92rem;
            }
          }
        `}
      </style>
    </section>
  );
}

