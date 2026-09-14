import React, { useState, useEffect, useRef } from 'react';
import { companyProfileData } from '../data/companyData';

export default function Industries() {
  const { industries } = companyProfileData;
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
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

  const cardGap = isMobile ? 40 : 100;

  return (
    <section 
      id="industries"
      ref={sectionRef}
      className="horizontal-marquee-container"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        padding: '40px 0',
        marginTop: '0px',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header - Minimal centered style */}
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 24px' }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 900, 
          color: '#9CA3AF', // Muted gray
          textTransform: 'uppercase', 
          letterSpacing: '0.15em',
          margin: 0
        }}>
          Industries We Serve
        </h2>
      </div>

      {/* Horizontal Strip Viewport */}
      <div 
        style={{ 
          width: '100%', 
          position: 'relative',
          padding: '20px 0',
          overflow: 'hidden'
        }}
      >
        <div className="horizontal-marquee-track">
          {[0, 1].map((setIdx) => (
            <div 
              key={`set-${setIdx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${cardGap}px`,
                paddingRight: `${cardGap}px`
              }}
            >
              {industries.map((ind, idx) => {
                return (
                  <div 
                    key={`${ind.name}-${idx}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ 
                      fontSize: isMobile ? '16px' : '18px', 
                      fontWeight: 600, 
                      color: '#94A3B8', // Light blue-gray text
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap'
                    }}>
                      {ind.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
