import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Testimonials() {
  const { testimonials } = companyProfileData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer: advances slowly every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Helper to calculate 3D card layout position and scaling
  const getCardStyle = (index) => {
    const total = testimonials.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      // Active center card
      return {
        transform: 'translateX(0) scale(1.05)',
        opacity: 1,
        zIndex: 10,
        boxShadow: '0 25px 50px -12px rgba(196, 30, 58, 0.18), 0 10px 25px rgba(0, 0, 0, 0.08)',
        border: '2px solid rgba(196, 30, 58, 0.2)',
        filter: 'none'
      };
    } else if (diff === 1 || diff === -(total - 1)) {
      // Right card
      return {
        transform: 'translateX(40%) scale(0.88)',
        opacity: 0.55,
        zIndex: 5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        border: '1px solid #E2E8F0',
        filter: 'blur(0.5px)'
      };
    } else if (diff === -1 || diff === total - 1) {
      // Left card
      return {
        transform: 'translateX(-40%) scale(0.88)',
        opacity: 0.55,
        zIndex: 5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        border: '1px solid #E2E8F0',
        filter: 'blur(0.5px)'
      };
    } else {
      // Hidden cards off-screen
      return {
        transform: diff > 0 ? 'translateX(80%) scale(0.75)' : 'translateX(-80%) scale(0.75)',
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none'
      };
    }
  };

  return (
    <section 
      id="testimonials" 
      style={{
        padding: '80px 0 90px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>
            Client <span style={{ color: '#C41E3A' }}>Testimonials</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '8px' }}>
            Trusted by leaders across India. Here is what our clients say about partnering with us.
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          style={{
            position: 'relative',
            height: '380px',
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {testimonials.map((t, idx) => {
            const style = getCardStyle(idx);
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: '580px',
                  maxWidth: '90%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '36px',
                  transition: 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                  ...style
                }}
              >
                {/* Quote Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(196, 30, 58, 0.08)',
                      color: '#C41E3A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Quote size={22} />
                  </div>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p 
                  style={{
                    fontSize: '1.08rem',
                    color: '#334155',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    marginBottom: '28px',
                    minHeight: '75px'
                  }}
                >
                  "{t.quote}"
                </p>

                {/* Author Details */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingTop: '20px',
                    borderTop: '1px solid #F1F5F9'
                  }}
                >
                  <div 
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #C41E3A 0%, #991B1B 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(196, 30, 58, 0.3)'
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#C41E3A', fontWeight: 700 }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls (< 1 of 5 >) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '36px'
          }}
        >
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#C41E3A';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#C41E3A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.color = '#0F172A';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <span 
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-heading)',
              minWidth: '70px',
              textAlign: 'center'
            }}
          >
            {currentIndex + 1} of {testimonials.length}
          </span>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#C41E3A';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#C41E3A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.color = '#0F172A';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}
