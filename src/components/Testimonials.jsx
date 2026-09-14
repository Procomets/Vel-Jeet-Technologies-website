import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Testimonials() {
  const { testimonials } = companyProfileData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isTransitioningRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    // Auto-advance testimonials every 4.5s
    const timer = setTimeout(() => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => { isTransitioningRef.current = false; }, 600);
    }, 4500);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, testimonials.length]);

  const handlePrev = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => { isTransitioningRef.current = false; }, 600);
  };

  const handleNext = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => { isTransitioningRef.current = false; }, 600);
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const getCardStyle = (index) => {
    const total = testimonials.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;

    const transitionCurve = 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)';
    const offset = isMobile ? 0 : 360;

    if (diff === 0) {
      return {
        transform: `translateX(0px) scale(1)`,
        opacity: 1,
        zIndex: 10,
        boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.08)',
        pointerEvents: 'auto',
        transition: transitionCurve
      };
    } else if (diff === 1 || diff === -(total - 1)) {
      return {
        transform: `translateX(${offset}px) scale(0.85)`,
        opacity: isMobile ? 0 : 0.6,
        zIndex: 5,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.02)',
        pointerEvents: 'none',
        transition: transitionCurve
      };
    } else if (diff === -1 || diff === total - 1) {
      return {
        transform: `translateX(-${offset}px) scale(0.85)`,
        opacity: isMobile ? 0 : 0.6,
        zIndex: 5,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.02)',
        pointerEvents: 'none',
        transition: transitionCurve
      };
    } else {
      return {
        transform: diff > 0 ? `translateX(${offset + 200}px) scale(0.7)` : `translateX(-${offset + 200}px) scale(0.7)`,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none',
        transition: transitionCurve
      };
    }
  };

  return (
    <section 
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        padding: isMobile ? '55px 0 45px 0' : '90px 0 70px 0',
        backgroundColor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', padding: isMobile ? '0 16px' : '0 24px' }}>
        
        {/* Header */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: isMobile ? '28px' : '40px' }}>
          {/* Background watermark */}
          <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontSize: isMobile ? '3.5rem' : '8rem', fontWeight: 900, color: '#000000', opacity: 0.03, zIndex: 0,
            whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '0.02em'
          }}>
            Testimonials
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              color: '#C41E3A',
              fontSize: isMobile ? '0.85rem' : '0.95rem', fontWeight: 600, marginBottom: '8px' 
            }}>
              What Our Clients Say About Us
            </div>
            <h2 style={{ fontSize: isMobile ? '1.85rem' : '3rem', fontWeight: 900, color: '#111827', margin: 0 }}>
              Testimonials
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Desktop Left Arrow */}
          {!isMobile && (
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute', left: '40px', zIndex: 20,
                background: 'none', border: 'none', cursor: 'pointer', padding: '10px',
                color: '#6B7280', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              <ChevronLeft size={36} strokeWidth={1.5} />
            </button>
          )}

          {/* Card Track */}
          <div style={{
            position: 'relative',
            height: isMobile ? '320px' : '380px',
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: isMobile ? 'calc(100% - 24px)' : '460px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: isMobile ? '16px' : '12px',
                  padding: isMobile ? '24px 20px' : '48px 40px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  border: '1px solid #E2E8F0',
                  ...getCardStyle(idx)
                }}
              >
                {/* Identity Block */}
                <div style={{ 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  gap: '14px', marginBottom: isMobile ? '16px' : '24px' 
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: isMobile ? '52px' : '64px',
                    height: isMobile ? '52px' : '64px',
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', flexShrink: 0
                  }}>
                    {t.image ? (
                      <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontWeight: 600, fontSize: '1.2rem', color: '#4B5563' }}>
                        {t.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  {/* Name & Role */}
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: isMobile ? '1.02rem' : '1.15rem', color: '#111827', marginBottom: '2px' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: '#6B7280' }}>
                      {t.role}
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} fill="#F97316" color="#F97316" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: isMobile ? '0.92rem' : '1.05rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  margin: 0
                }}>
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Right Arrow */}
          {!isMobile && (
            <button
              onClick={handleNext}
              style={{
                position: 'absolute', right: '40px', zIndex: 20,
                background: 'none', border: 'none', cursor: 'pointer', padding: '10px',
                color: '#6B7280', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              <ChevronRight size={36} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Mobile & Desktop Controls Bar */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '12px', 
          marginTop: isMobile ? '16px' : '24px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button
                onClick={handlePrev}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0F172A', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Pagination Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isTransitioningRef.current || idx === currentIndex) return;
                    setCurrentIndex(idx);
                  }}
                  style={{
                    width: currentIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: currentIndex === idx ? '#C41E3A' : '#CBD5E1',
                    transition: 'all 300ms ease',
                    cursor: 'pointer'
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {isMobile && (
              <button
                onClick={handleNext}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0F172A', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>

          {isMobile && (
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.02em' }}>
              ‹ Swipe left or right to read more testimonials ›
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

