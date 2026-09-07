import React from 'react';
import { Award, Sliders, Globe, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

const iconMap = {
  Award, Sliders, Globe, Zap, TrendingUp, CheckCircle
};

export default function WhyChooseUs({ onOpenContactModal }) {
  const { whyChooseUs } = companyProfileData;

  return (
    <section 
      id="why-choose-us" 
      style={{
        padding: '90px 0',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A' }}>
            Why Choose <span style={{ color: '#C41E3A' }}>Vel Jeet Technologies?</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '10px' }}>
            Key differentiators that make us the preferred strategic consulting partner for leading businesses.
          </p>
        </div>

        {/* 6 Feature Grid (Styled like Reference Image 1 Key Features) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}
        >
          {whyChooseUs.map((item, idx) => {
            const IconComp = iconMap[item.icon] || CheckCircle;

            return (
              <div
                key={idx}
                className="card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}
              >
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: '#FEF2F2',
                    color: '#C41E3A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #FCA5A5'
                  }}
                >
                  <IconComp size={24} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
