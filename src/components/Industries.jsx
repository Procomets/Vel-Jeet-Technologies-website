import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Industries() {
  const { industries } = companyProfileData;
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardGap = isMobile ? 40 : 100;

  return (
    <section 
      id="industries"
      className="horizontal-marquee-container"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        padding: '60px 0',
        marginTop: isMobile ? '60px' : '120px',
        overflow: 'hidden'
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
                      gap: '12px',
                      flexShrink: 0
                    }}
                  >
                    <Layers size={22} color="#CBD5E1" strokeWidth={1.5} />
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
