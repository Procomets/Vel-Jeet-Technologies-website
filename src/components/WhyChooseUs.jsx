import React from 'react';
import { ArrowRight, Users, Zap, Handshake, Award } from 'lucide-react';

const benefitsList = [
  { 
    num: '01', 
    title: 'RIGHT TALENT', 
    desc: 'The right people for the right roles, thoroughly screened and vetted.',
    icon: Users
  },
  { 
    num: '02', 
    title: 'FASTER HIRING', 
    desc: 'Streamlined recruitment workflows designed to reduce time-to-hire.',
    icon: Zap
  },
  { 
    num: '03', 
    title: 'LONG-TERM PARTNERSHIP', 
    desc: 'Dedicated workforce support and relationships that extend beyond placement.',
    icon: Handshake
  },
  { 
    num: '04', 
    title: 'INDUSTRY EXPERTISE', 
    desc: 'Tailored talent solutions customized across tech, manufacturing, and BFSI.',
    icon: Award
  }
];

export default function WhyChooseUs({ onOpenContactModal }) {
  return (
    <section 
      id="why-choose-us" 
      style={{
        padding: '70px 24px',
        backgroundColor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        

        <h2 style={{ 
          fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', 
          fontWeight: 800, 
          color: '#0F172A', 
          lineHeight: 1.25, 
          letterSpacing: '0.015em', 
          marginBottom: '16px'
        }}>
          Why Businesses Choose <span style={{ color: '#C41E3A' }}>Vel-Jeet</span>
        </h2>

        <p style={{
          maxWidth: '620px',
          margin: '0 auto 48px',
          fontSize: '1rem',
          color: '#64748B',
          lineHeight: 1.6
        }}>
          We partner with forward-thinking enterprises and startups to accelerate recruitment with speed, precision, and trust.
        </p>

        {/* 4 Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          textAlign: 'left',
          marginBottom: '48px'
        }}>
          {benefitsList.map((b) => {
            const Icon = b.icon;
            return (
              <div 
                key={b.num} 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '28px 24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#FEF2F2',
                    color: '#C41E3A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em' }}>
                    {b.num}
                  </span>
                </div>

                <div>
                  <h3 style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: 700, 
                    color: '#0F172A', 
                    letterSpacing: '0.02em', 
                    textTransform: 'uppercase',
                    margin: '0 0 6px 0'
                  }}>
                    {b.title}
                  </h3>
                  <p style={{ 
                    color: '#64748B', 
                    fontSize: '0.88rem', 
                    lineHeight: 1.5, 
                    margin: 0 
                  }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <a 
            href="#contact"
            onClick={(e) => { e.preventDefault(); onOpenContactModal && onOpenContactModal(); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#C41E3A',
              color: '#FFFFFF',
              padding: '14px 34px',
              borderRadius: '40px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(196, 30, 58, 0.25)'
            }}
          >
            Let's Work Together <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
