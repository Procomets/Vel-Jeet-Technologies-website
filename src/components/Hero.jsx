import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onOpenContactModal }) {
  const kpis = [
    {
      value: '500+',
      label: 'Placements Delivered',
      subtext: 'Across IT, BPO & Manufacturing',
      color: '#C41E3A'
    },
    {
      value: '98.5%',
      label: 'Retention Rate',
      subtext: 'Long-Term Candidate Fit',
      color: '#0F172A'
    },
    {
      value: '100%',
      label: 'Statutory Compliance',
      subtext: 'PF, ESI & Labor Standards',
      color: '#C41E3A'
    },
    {
      value: '50+',
      label: 'Enterprise Clients',
      subtext: 'Startups & Corporate Partners',
      color: '#0F172A'
    }
  ];

  return (
    <section id="hero" style={{ position: 'relative', width: '100%', backgroundColor: '#FFFFFF' }}>
      {/* Upper Hero Banner with Background Image */}
      <div 
        style={{
          position: 'relative',
          minHeight: '560px',
          padding: '190px 0 140px',
          backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 10%, rgba(255, 255, 255, 0.91) 4%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.10) 50%), url('/images/hero.jpg')",
          backgroundPosition: 'center right',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '620px',paddingTop:'-60px' }}>
            <h1 
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#0F172A',
                marginBottom: '22px',
                fontFamily: 'var(--font-heading)'
              }}
            >
              We don't just fill positions, we fuel your <span style={{ color: '#c90d2cff' }}>company's success.</span>
            </h1>

            <p 
              style={{
                fontSize: '1.125rem',
                color: '#334155',
                lineHeight: 1.6,
                marginBottom: '36px',
                fontWeight: 500
              }}
            >
              Your trusted recruitment partner delivering top-tier talent and end-to-end workforce solutions tailored for growing enterprises.
            </p>

            {/* Call To Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                className="btn-primary-red"
                onClick={onOpenContactModal}
                style={{
                  padding: '16px 32px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '8px'
                }}
              >
                Hire Top Talent Now
                <ArrowRight size={20} />
              </button>

              <a 
                href="#services"
                className="btn-secondary-dark"
                style={{
                  padding: '16px 28px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '8px'
                }}
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Center Bottom White KPI Card in Ribbon's Position Below Hero Image */}
      <div 
        style={{
          maxWidth: '1180px',
          width: 'calc(100% - 48px)',
          margin: '-20px auto 60px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div 
          className="kpi-white-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px 36px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12), 0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E8F0'
          }}
        >
          <div 
            className="kpi-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              textAlign: 'center',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            {kpis.map((kpi, index) => (
              <div 
                key={index}
                className="kpi-item"
                style={{
                  borderRight: index !== kpis.length - 1 ? '1px solid #E2E8F0' : 'none',
                  paddingRight: index !== kpis.length - 1 ? '16px' : '0'
                }}
              >
                <div 
                  style={{
                    fontSize: '2.4rem',
                    fontWeight: 800,
                    color: kpi.color,
                    lineHeight: 1,
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '6px'
                  }}
                >
                  {kpi.value}
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '3px' }}>
                  {kpi.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
