import React from 'react';
import { Target, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function MissionVision({ onOpenContactModal }) {
  const { mission, vision } = companyProfileData.missionVision;

  return (
    <section 
      id="mission" 
      style={{
        padding: '80px 0',
        backgroundColor: '#FDFBF7',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A' }}>
            Our Mission & <span style={{ color: '#C41E3A' }}>Vision</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '8px' }}>
            Driving business performance through intentional workforce strategy and unyielding integrity.
          </p>
        </div>

        {/* Two Equal Hero Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Mission Card (Crimson Deep Card) */}
          <div 
            className="card-hover"
            style={{
              background: 'linear-gradient(135deg, #C41E3A 0%, #991B1B 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(196, 30, 58, 0.25)'
            }}
          >
            <div 
              className="pattern-dots-dark" 
              style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Target size={30} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FCA5A5' }}>
                PURPOSE DRIVEN
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              {mission.title}
            </h3>

            <p style={{ fontSize: '1.1rem', color: '#FEE2E2', lineHeight: 1.7, marginBottom: '24px' }}>
              {mission.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
              <span>Focus: Empowering Business Growth & Candidate Success</span>
            </div>
          </div>

          {/* Vision Card (Dark Charcoal Card) */}
          <div 
            className="card-hover"
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(15, 23, 42, 0.2)',
              border: '1px solid #1E293B'
            }}
          >
            <div 
              className="pattern-dots-dark" 
              style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#C41E3A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Eye size={30} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94A3B8' }}>
                FUTURE HORIZON
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              {vision.title}
            </h3>

            <p style={{ fontSize: '1.1rem', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '24px' }}>
              {vision.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: '#FCA5A5' }}>
              <span>Target: Benchmark of Excellence Across India</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
