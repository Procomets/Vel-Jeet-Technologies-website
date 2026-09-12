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
        <div className="overview-grid">
          
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
                className="overview-image"
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
                  fontWeight: 900
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Client-Focused Partner</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Based in Chennai, India</div>
              </div>
            </div>

          </div>

          {/* Right Column: Paragraph Content & Highlights */}
          <div className="overview-text-col">
            <h2 className="overview-h2">
              What is <span style={{ color: '#C41E3A' }}>Vel Jeet Technologies?</span>
            </h2>

            <h3 className="overview-h3">
              {overview.subtitle}
            </h3>

            <p className="overview-p" style={{ marginBottom: '16px' }}>
              <strong>VEL JEET TECHNOLOGIES</strong> is a dynamic and client-focused recruitment partner based in Chennai, India. We specialize in providing end-to-end human resource solutions tailored to meet the diverse hiring needs of businesses across industries.
            </p>

            <p className="overview-p" style={{ marginBottom: '28px' }}>
              Founded with a vision to bridge the gap between talent and opportunity, we combine industry knowledge, innovative sourcing strategies, and deep client alignment to deliver the right people for the right roles.
            </p>

            {/* Core Values Checklist */}
            <div className="core-values-grid">
              <div className="overview-check">
                <CheckCircle size={18} color="#C41E3A" />
                Industry Knowledge
              </div>
              <div className="overview-check">
                <CheckCircle size={18} color="#C41E3A" />
                Innovative Sourcing
              </div>
              <div className="overview-check">
                <CheckCircle size={18} color="#C41E3A" />
                Deep Talent Network
              </div>
              <div className="overview-check">
                <CheckCircle size={18} color="#C41E3A" />
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

      <style>
        {`
          .overview-grid {
            display: grid;
            grid-template-columns: 5fr 6fr; /* Give text slightly more room than image on large screens */
            gap: 80px;
            align-items: center;
          }
          
          .overview-image {
            width: 100%;
            height: 520px;
            object-fit: cover;
            display: block;
          }

          .overview-h2 {
            font-size: 3.2rem;
            font-weight: 800;
            color: #0F172A;
            margin-bottom: 16px;
            line-height: 1.2;
          }

          .overview-h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 20px;
            line-height: 1.35;
          }

          .overview-p {
            font-size: 1.1rem;
            color: #475569;
            line-height: 1.6;
          }

          .overview-check {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.05rem;
            font-weight: 700;
            color: #1E293B;
          }
          
          .core-values-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }

          @media (max-width: 992px) {
            .overview-grid {
              grid-template-columns: 1fr;
              gap: 60px;
            }
          }

          @media (max-width: 768px) {
            .overview-grid {
              gap: 40px;
            }
            .core-values-grid {
              grid-template-columns: 1fr;
            }
            .overview-image {
              height: 320px;
            }
            .overview-h2 {
              font-size: 2.1rem;
            }
            .overview-h3 {
              font-size: 1.25rem;
            }
            .overview-p {
              font-size: 0.94rem;
            }
            .overview-check {
              font-size: 0.88rem;
            }
          }
        `}
      </style>
    </section>
  );
}
