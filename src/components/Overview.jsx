import React from 'react';
import { Target, Compass, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Overview({ onOpenContactModal }) {
  const { overview } = companyProfileData;

  return (
    <section 
      id="overview" 
      style={{
        padding: '90px 0',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Two Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          {/* Left Column: Image with Red Layered Box Offset */}
          <div style={{ position: 'relative' }}>
            
            {/* Red Solid Accent Layer behind Image */}
            <div 
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80%',
                height: '90%',
                backgroundColor: '#C41E3A',
                borderRadius: '12px',
                zIndex: 1
              }}
            />

            {/* Main Image */}
            <div 
              style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                border: '4px solid #FFFFFF'
              }}
            >
              <img 
                src="/images/about.jpg" 
                alt="Vel Jeet Technologies Team Consultation"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Overlaid Badge */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-25px',
                left: '30px',
                zIndex: 3,
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '16px 24px',
                borderRadius: '10px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#C41E3A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Client-Focused Partner</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Based in Chennai, India</div>
              </div>
            </div>

          </div>

          {/* Right Column: Paragraph Content & Highlights */}
          <div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
              What is <span style={{ color: '#C41E3A' }}>Vel Jeet Technologies?</span>
            </h2>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#000000ff', marginBottom: '16px', lineHeight: 1.35 }}>
              {overview.subtitle}
            </h3>

            <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong>VEL JEET TECHNOLOGIES</strong> is a dynamic and client-focused recruitment partner based in Chennai, India. We specialize in providing end-to-end human resource solutions tailored to meet the diverse hiring needs of businesses across industries.
            </p>

            <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.6, marginBottom: '22px' }}>
              Founded with a vision to bridge the gap between talent and opportunity, we combine industry knowledge, innovative sourcing strategies, and deep client alignment to deliver the right people for the right roles.
            </p>

            {/* Core Values Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B' }}>
                <CheckCircle size={16} color="#C41E3A" />
                Industry Knowledge
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B' }}>
                <CheckCircle size={16} color="#C41E3A" />
                Innovative Sourcing
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B' }}>
                <CheckCircle size={16} color="#C41E3A" />
                Deep Talent Network
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#1E293B' }}>
                <CheckCircle size={16} color="#C41E3A" />
                Tailored Solutions
              </div>
            </div>

            <button 
              className="btn-primary-red"
              onClick={onOpenContactModal}
              style={{ padding: '12px 24px', fontSize: '0.9rem' }}
            >
              Read Full Profile & Partner With Us
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
