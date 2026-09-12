import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Testimonials() {
  const { testimonials } = companyProfileData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isTransitioningRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    // Use setTimeout instead of setInterval. Since currentIndex is a dependency,
    // this effect will re-run and schedule the next slide 4.5s after every change.
    const timer = setTimeout(() => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => { isTransitioningRef.current = false; }, 700);
    }, 4500);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, testimonials.length]);

  const handlePrev = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => { isTransitioningRef.current = false; }, 700);
  };

  const handleNext = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => { isTransitioningRef.current = false; }, 700);
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

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
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

    const transitionCurve = 'all 700ms cubic-bezier(0.22, 1, 0.36, 1)';
    const offset = isMobile ? 0 : 360; // Spread of side cards

    if (diff === 0) {
      return {
        transform: `translateX(0px) scale(1)`,
        opacity: 1,
        zIndex: 10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
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
      style={{
        padding: '100px 0',
        backgroundColor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
        
        {/* Header exact match to reference */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '80px' }}>
          {/* Faded background text */}
          <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontSize: isMobile ? '4rem' : '8rem', fontWeight: 900, color: '#000000', opacity: 0.03, zIndex: 0,
            whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '0.02em'
          }}>
            Testimonials
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              color: '#C41E3A', // Vel-Jeet Brand Red
              fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px' 
            }}>
              What Our Clients Say About Us
            </div>
            <h2 style={{ fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: 900, color: '#111827', margin: 0 }}>
              Testimonials
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Left Arrow (Far left) */}
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

          {/* 3D Track */}
          <div style={{
            position: 'relative',
            height: '380px',
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
                  maxWidth: '460px', // Precise width for overlap spacing
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '48px 40px',
                  textAlign: 'center', // Center aligned exactly like reference
                  ...getCardStyle(idx)
                }}
              >
                {/* Identity Block */}
                <div style={{ 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  gap: '16px', marginBottom: '24px' 
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
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
                    <div style={{ fontWeight: 600, fontSize: '1.15rem', color: '#111827', marginBottom: '4px' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#6B7280' }}>
                      {t.role}
                    </div>
                    {/* Tiny stars to respect existing data without breaking layout */}
                    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} fill="#F97316" color="#F97316" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Centered Quote */}
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.65,
                  color: '#4B5563',
                  margin: 0
                }}>
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow (Far right) */}
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

        {/* Dot Pagination */}
        <div style={{ 
          display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' 
        }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (isTransitioningRef.current || idx === currentIndex) return;
                setCurrentIndex(idx);
              }}
              style={{
                width: '10px', height: '10px', borderRadius: '50%',
                padding: 0, border: 'none',
                backgroundColor: currentIndex === idx ? '#9CA3AF' : '#E5E7EB',
                transition: 'background-color 300ms ease',
                cursor: 'pointer'
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
