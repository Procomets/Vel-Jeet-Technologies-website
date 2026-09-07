import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function ThankYouBanner({ onOpenContactModal }) {
  return (
    <section 
      style={{
        background: 'linear-gradient(135deg, #C41E3A 0%, #991B1B 100%)',
        color: '#FFFFFF',
        padding: '70px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        className="pattern-dots-dark" 
        style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} 
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
          Thank You for Considering <span style={{ color: '#FCA5A5' }}>Vel Jeet Technologies</span>
        </h2>

        <p style={{ fontSize: '1.15rem', color: '#FEE2E2', maxWidth: '650px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          Ready to scale your team with top-tier candidates across India? Connect with our senior recruitment partners today.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            onClick={onOpenContactModal}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#991B1B',
              fontWeight: 800,
              fontSize: '1rem',
              padding: '16px 32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 24px rgba(0,0,0,0.2)'
            }}
          >
            Start Your Hiring Campaign
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
