import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const urls = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
];

const extendedUrls = [
  ...urls,
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
];

const mobilePortraits = [
  { url: urls[4] }, { url: urls[7] }, { url: urls[2] }, { url: urls[8] }
];

const benefitsList = [
  { num: '01', title: 'RIGHT TALENT', desc: 'Connect businesses with candidates aligned to their requirements.' },
  { num: '02', title: 'FASTER HIRING', desc: 'Streamlined recruitment processes designed to reduce time-to-hire.' },
  { num: '03', title: 'LONG-TERM PARTNERSHIP', desc: 'Support businesses beyond the initial placement.' },
  { num: '04', title: 'INDUSTRY EXPERTISE', desc: 'Solutions tailored to different industries and workforce needs.' }
];

const desktopBenefitsList = [
  { num: '01', title: 'RIGHT TALENT', desc: 'The right people for the right roles.' },
  { num: '02', title: 'FASTER HIRING', desc: 'Connecting qualified talent, faster.' },
  { num: '03', title: 'LONG-TERM PARTNERSHIP', desc: 'Building relationships beyond hiring.' },
  { num: '04', title: 'INDUSTRY EXPERTISE', desc: 'Tailored solutions for your industry.' }
];

export default function WhyChooseUs({ onOpenContactModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Portrait hover
  const [hoveredBenefit, setHoveredBenefit] = useState(null); // Label hover
  const sectionRef = useRef(null);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1060;
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const getEntranceStyle = (level, index = 0) => {
    if (prefersReducedMotion) return { opacity: 1, transform: 'translateY(0)' };
    const baseDelay = level === 1 ? 0 : level === 2 ? 300 : 500;
    const delay = baseDelay + index * 50;
    const yDist = level === 1 ? '15px' : '10px';
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${yDist})`,
      transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
    };
  };

  const getPos = (desktopX, desktopY) => {
    const x = isTablet ? desktopX * 0.72 : desktopX;
    return { left: `calc(50% + ${x}px)`, top: `${desktopY}px` };
  };

  const desktopPortraits = [
    { url: extendedUrls[0], ...getPos(-646, 80), width: '120px', height: '130px' },
    { url: extendedUrls[1], ...getPos(-646, 230), width: '120px', height: '160px' },
    { url: extendedUrls[2], ...getPos(-502, 40), width: '130px', height: '140px' },
    { url: extendedUrls[3], ...getPos(-502, 200), width: '130px', height: '180px' },
    { url: extendedUrls[4], ...getPos(-348, 150), width: '110px', height: '140px' },
    { url: extendedUrls[5], ...getPos(-214, 70), width: '120px', height: '150px' },
    { url: extendedUrls[6], ...getPos(-70, 40), width: '140px', height: '160px' },
    { url: extendedUrls[7], ...getPos(94, 60), width: '120px', height: '150px' },
    { url: extendedUrls[8], ...getPos(238, 160), width: '110px', height: '130px' },
    { url: extendedUrls[9], ...getPos(372, 40), width: '130px', height: '150px' },
    { url: extendedUrls[10], ...getPos(372, 210), width: '130px', height: '170px' },
    { url: extendedUrls[11], ...getPos(526, 100), width: '120px', height: '140px' },
    { url: extendedUrls[12], ...getPos(526, 260), width: '120px', height: '160px' }
  ];

  const columns = [
    { x: -646, w: 120 }, { x: -502, w: 130 }, { x: -348, w: 110 },
    { x: -214, w: 120 }, { x: -70, w: 140 }, { x: 94, w: 120 },
    { x: 238, w: 110 }, { x: 372, w: 130 }, { x: 526, w: 120 }
  ];

  const getMappedBenefit = (index) => {
    if (index <= 3) return 0; // Cols 1-2 map to Right Talent
    if (index >= 4 && index <= 7) return 1; // Cols 3-6 map to Faster Hiring
    if (index >= 8 && index <= 10) return 2; // Cols 7-8 map to Long-Term
    if (index >= 11) return 3; // Col 9 maps to Industry Expertise
    return null;
  };

  const renderMobileContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 10 }}>
      <div style={{ textAlign: 'center', maxWidth: '550px', margin: '0 auto', padding: '0 10px' }}>
        <h2 style={{ 
          fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: '#0F172A', 
          lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '20px'
        }}>
          Why Businesses Choose <span style={{ color: '#C41E3A' }}>Vel-Jeet</span>
        </h2>
        
        {/* 4 Benefits Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr', gap: '16px', textAlign: 'left', margin: '0 0 32px 0'
        }}>
          {benefitsList.map((b) => (
            <div key={b.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ color: '#334155', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                {b.title}
              </div>
              <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <a 
            href="#contact"
            onClick={(e) => { e.preventDefault(); onOpenContactModal && onOpenContactModal(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', backgroundColor: '#C41E3A', color: '#FFFFFF',
              padding: '14px 32px', borderRadius: '40px', fontWeight: 600, fontSize: '1.05rem',
              textDecoration: 'none', boxShadow: '0 8px 24px rgba(196, 30, 58, 0.25)'
            }}
          >
            Let's Work Together <ArrowRight size={18} style={{ marginLeft: '10px' }} />
          </a>
        </div>
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* LEVEL 1: Portrait Gallery Wave */}
      <div style={{ height: 0, position: 'relative', width: '100%' }}>
        {desktopPortraits.map((p, i) => (
          <div 
            key={`p-${i}`} 
            style={{
              position: 'absolute',
              top: p.top, left: p.left,
              width: isTablet ? `${parseInt(p.width) * 0.9}px` : p.width,
              height: isTablet ? `${parseInt(p.height) * 0.9}px` : p.height,
              zIndex: 10
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '16px',
              backgroundImage: `url(${p.url})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              backgroundColor: '#FFFFFF',
              border: '3px solid #FFFFFF',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)'
            }} />
          </div>
        ))}
      </div>

      {/* LEVEL 2: Central Content & 4 Benefits Directly Below */}
      <div style={{ 
        textAlign: 'center',
        maxWidth: '1180px',
        margin: '380px auto 0',
        position: 'relative',
        zIndex: 30
      }}>
        <h2 style={{ 
          fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, color: '#0F172A', 
          lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '28px'
        }}>
          Why Businesses Choose <br/><span style={{ color: '#C41E3A' }}>Vel-Jeet</span>
        </h2>
        
        {/* 4 Benefits Row - Static & Displayed Directly Below Title */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: isTablet ? '16px' : '24px',
          textAlign: 'left',
          width: '100%',
          marginBottom: '48px'
        }}>
          {desktopBenefitsList.map((b) => (
            <div key={b.title} style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
              <div style={{ 
                color: '#334155', 
                fontWeight: 600, 
                fontSize: '0.92rem', 
                letterSpacing: '0.02em', 
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}>
                {b.title}
              </div>
              <p style={{ color: '#64748B', fontSize: 'clamp(0.78rem, 0.88vw, 0.86rem)', lineHeight: 1.5, margin: 0, whiteSpace: 'nowrap' }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        <div>
          <a 
            href="#contact"
            onClick={(e) => { e.preventDefault(); onOpenContactModal && onOpenContactModal(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', backgroundColor: '#C41E3A', color: '#FFFFFF',
              padding: '16px 36px', borderRadius: '40px', fontWeight: 600, fontSize: '1.05rem',
              textDecoration: 'none', boxShadow: '0 8px 24px rgba(196, 30, 58, 0.25)'
            }}
          >
            Let's Work Together <ArrowRight size={18} style={{ marginLeft: '10px' }} />
          </a>
        </div>

      </div>

    </div>
  );

  return (
    <section 
      id="why-choose-us" 
      style={{
        padding: isMobile ? '30px 16px' : '50px 24px',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div 
        ref={sectionRef}
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          padding: '0'
        }}
      >
        {isMobile ? renderMobileContent() : renderDesktopContent()}
      </div>
    </section>
  );
}
