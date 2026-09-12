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
  { num: '02', title: 'FASTER HIRING', desc: 'Connecting you with qualified talent, faster.' },
  { num: '03', title: 'LONG-TERM PARTNERSHIP', desc: 'Building relationships beyond the first hire.' },
  { num: '04', title: 'INDUSTRY EXPERTISE', desc: 'Talent solutions shaped around your industry.' }
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {mobilePortraits.slice(0, 2).map((p, i) => (
          <div 
            key={i}
            style={{
              width: '130px', height: '180px', borderRadius: '16px',
              backgroundImage: `url(${p.url})`, backgroundSize: 'cover', backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)', border: '4px solid #FFFFFF',
              ...getEntranceStyle(1, i)
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', maxWidth: '550px', margin: '0 auto', padding: '0 20px' }}>
        <div style={getEntranceStyle(2, 0)}>
          <span style={{ 
            display: 'inline-block', fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', 
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px',
            padding: '6px 16px', backgroundColor: '#F8FAFC', borderRadius: '20px', border: '1px solid #E2E8F0'
          }}>
            Why Vel-Jeet
          </span>
        </div>
        <h2 style={{ 
          fontSize: 'clamp(2.2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0F172A', 
          lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px', ...getEntranceStyle(2, 1)
        }}>
          Why Businesses Choose <span style={{ color: '#C41E3A' }}>Vel-Jeet</span>
        </h2>
        <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 400, ...getEntranceStyle(2, 2) }}>
          More than recruitment. A workforce partner built around your business.
        </p>
        <div style={getEntranceStyle(2, 3)}>
          <a 
            href="#contact"
            onClick={(e) => { e.preventDefault(); onOpenContactModal && onOpenContactModal(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', backgroundColor: '#C41E3A', color: '#FFFFFF',
              padding: '14px 32px', borderRadius: '40px', fontWeight: 600, fontSize: '1.05rem',
              textDecoration: 'none', marginTop: '24px', boxShadow: '0 8px 24px rgba(196, 30, 58, 0.25)'
            }}
          >
            Let's Work Together <ArrowRight size={18} style={{ marginLeft: '10px' }} />
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {mobilePortraits.slice(2, 4).map((p, i) => (
          <div 
            key={i + 2}
            style={{
              width: '130px', height: '180px', borderRadius: '16px',
              backgroundImage: `url(${p.url})`, backgroundSize: 'cover', backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)', border: '4px solid #FFFFFF',
              ...getEntranceStyle(1, i + 2)
            }}
          />
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginTop: '40px',
        paddingTop: '40px', borderTop: '1px solid #E2E8F0', textAlign: 'left', width: '100%'
      }}>
        {benefitsList.map((b, i) => (
          <div key={b.num} style={getEntranceStyle(3, i)}>
            <div style={{ color: '#C41E3A', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '0.05em' }}>{b.num}</div>
            <h4 style={{ color: '#0F172A', fontWeight: 600, fontSize: '1.1rem', marginBottom: '16px', letterSpacing: '0.02em' }}>{b.title}</h4>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* LEVEL 1: Portrait Gallery Wave */}
      <div style={{ height: 0, position: 'relative', width: '100%' }}>
        {/* Subtle Dashed Guide Lines dropping from the column centers */}
        {columns.map((c, i) => {
          const left = getPos(c.x + c.w / 2, 0).left;
          const isCenterLine = i >= 2 && i <= 6;
          const h = isCenterLine ? '320px' : '520px';
          
          return (
            <div key={`guide-${i}`} style={{ 
              position: 'absolute', top: 0, left, 
              width: '1px', height: h, 
              borderLeft: '1px dashed #CBD5E1',
              opacity: 0.6,
              zIndex: 1 
            }} />
          );
        })}

        {desktopPortraits.map((p, i) => {
          const mappedBenefit = getMappedBenefit(i);
          
          let isHighlighted = false;
          let isFaded = false;

          if (hoveredBenefit !== null) {
            if (mappedBenefit === hoveredBenefit) isHighlighted = true;
            else isFaded = true;
          } else if (hoveredIndex !== null) {
            if (hoveredIndex === i) isHighlighted = true;
            else isFaded = true;
          }

          return (
            <div 
              key={`p-${i}`} 
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'absolute',
                top: p.top, left: p.left,
                width: isTablet ? `${parseInt(p.width) * 0.9}px` : p.width,
                height: isTablet ? `${parseInt(p.height) * 0.9}px` : p.height,
                zIndex: isHighlighted ? 20 : 10,
                ...getEntranceStyle(1, i)
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '16px',
                backgroundImage: `url(${p.url})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                backgroundColor: '#FFFFFF',
                border: '3px solid #FFFFFF',
                boxShadow: isHighlighted ? '0 0 0 2px rgba(196, 30, 58, 0.1), 0 16px 40px rgba(15, 23, 42, 0.15)' : '0 8px 24px rgba(15, 23, 42, 0.05)',
                opacity: isFaded ? 0.88 : 1,
                transform: isHighlighted ? 'scale(1.04) translateY(-5px)' : 'scale(1) translateY(0)',
                transition: 'all 350ms ease-out',
                cursor: 'pointer'
              }} />
            </div>
          );
        })}
      </div>

      {/* LEVEL 2: Central Safe Zone & Message */}
      <div style={{ 
        textAlign: 'center',
        maxWidth: '700px',
        margin: '380px auto 0',
        position: 'relative',
        zIndex: 30
      }}>
        <div style={getEntranceStyle(2, 0)}>
          <span style={{ 
            display: 'inline-block', fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', 
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px',
            padding: '6px 16px', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.02)'
          }}>
            Why Vel-Jeet
          </span>
        </div>

        <h2 style={{ 
          fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 900, color: '#0F172A', 
          lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px', ...getEntranceStyle(2, 1)
        }}>
          Why Businesses Choose <br/><span style={{ color: '#C41E3A' }}>Vel-Jeet</span>
        </h2>
        
        <p style={{ 
          color: '#64748B', fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 400,
          maxWidth: '500px', margin: '0 auto', ...getEntranceStyle(2, 2)
        }}>
          More than recruitment. A workforce partner built around your business.
        </p>

        <div style={getEntranceStyle(2, 3)}>
          <a 
            href="#contact"
            onClick={(e) => { e.preventDefault(); onOpenContactModal && onOpenContactModal(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', backgroundColor: '#C41E3A', color: '#FFFFFF',
              padding: '16px 36px', borderRadius: '40px', fontWeight: 600, fontSize: '1.05rem',
              textDecoration: 'none', marginTop: '40px', boxShadow: '0 8px 24px rgba(196, 30, 58, 0.25)',
              transition: 'all 0.2s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(196, 30, 58, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(196, 30, 58, 0.25)';
            }}
          >
            Let's Work Together <ArrowRight size={18} style={{ marginLeft: '10px' }} />
          </a>
        </div>
      </div>

      {/* LEVEL 3: Interactive Benefit Navigation Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isTablet ? '24px' : '48px',
        margin: '80px auto 0',
        position: 'relative',
        zIndex: 40,
        maxWidth: '1080px',
        height: '120px' // Fixed height container prevents layout shift when description drops down
      }}>
        {desktopBenefitsList.map((b, i) => {
          const isHovered = hoveredBenefit === i || (hoveredIndex !== null && getMappedBenefit(hoveredIndex) === i);
          
          return (
            <div 
              key={`nav-${i}`}
              onMouseEnter={() => setHoveredBenefit(i)}
              onMouseLeave={() => setHoveredBenefit(null)}
              style={{
                flex: 1,
                maxWidth: '220px',
                textAlign: 'left',
                cursor: 'pointer',
                ...getEntranceStyle(3, i)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ 
                  color: isHovered ? '#C41E3A' : '#94A3B8', 
                  fontWeight: 600, 
                  fontSize: '0.85rem', 
                  transition: 'color 300ms ease' 
                }}>
                  {b.num}
                </span>
                <span style={{ 
                  color: isHovered ? '#0F172A' : '#475569', 
                  fontWeight: 600, 
                  fontSize: '1rem', 
                  letterSpacing: '0.02em',
                  transition: 'color 300ms ease'
                }}>
                  {b.title}
                </span>
              </div>
              
              {/* Smoothly animated description reveal */}
              <div style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
                transition: 'all 300ms ease-out',
                marginTop: '12px',
                pointerEvents: isHovered ? 'auto' : 'none'
              }}>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );

  return (
    <section 
      id="why-choose-us" 
      style={{
        padding: isMobile ? '40px 16px' : '80px 24px',
        backgroundColor: 'transparent'
      }}
    >
      <div 
        ref={sectionRef}
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          padding: isMobile ? '0' : '0 0 60px 0'
        }}
      >
        {isMobile ? renderMobileContent() : renderDesktopContent()}
      </div>
    </section>
  );
}
