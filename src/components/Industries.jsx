import React from 'react';

const industryNames = [
  "IT & ITES",
  "BPO & KPO",
  "Manufacturing",
  "Healthcare",
  "Retail & E-commerce",
  "Logistics",
  "Education",
  "Financial Services",
  "Engineering & Construction"
];

export default function Industries() {
  // Multiply items for seamless, non-stop horizontal marquee scrolling
  const marqueeItems = [...industryNames, ...industryNames, ...industryNames];

  return (
    <section 
      id="industries" 
      style={{
        padding: '60px 0 70px',
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Title On Top */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 36px', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2 
          style={{ 
            fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', 
            fontWeight: 800, 
            color: '#0F172A',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
            margin: 0
          }}
        >
          Industries <span style={{ color: '#C41E3A' }}>We Serve</span>
        </h2>
      </div>

      {/* Fully Borderless Text-Only Horizontal Infinite Scroll Banner */}
      <div 
        className="horizontal-marquee-container"
        style={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          padding: '16px 0',
          position: 'relative'
        }}
      >
        {/* Left & Right Gradient Fade Masks (White Fade) */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />

        {/* Marquee Track */}
        <div className="horizontal-marquee-track">
          {marqueeItems.map((name, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '36px',
                paddingRight: '36px'
              }}
            >
              <span 
                style={{
                  fontSize: 'clamp(1.25rem, 2.1vw, 1.7rem)',
                  fontWeight: 700,
                  color: '#475569',
                  letterSpacing: '0.03em',
                  fontFamily: 'var(--font-heading)',
                  whiteSpace: 'nowrap'
                }}
              >
                {name}
              </span>
              <span 
                style={{ 
                  color: '#C41E3A', 
                  fontSize: '1.4rem', 
                  fontWeight: 900 
                }}
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
