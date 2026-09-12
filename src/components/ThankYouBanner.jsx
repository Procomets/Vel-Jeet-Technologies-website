import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function ThankYouBanner({ onOpenContactModal }) {
  return (
    <section 
      style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Red Accent Background Shapes */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '-100px', 
          right: '-50px', 
          width: '300px', 
          height: '300px', 
          background: 'radial-gradient(circle, rgba(196,30,58,0.15) 0%, rgba(15,23,42,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} 
      />
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '-100px', 
          left: '-50px', 
          width: '300px', 
          height: '300px', 
          background: 'radial-gradient(circle, rgba(196,30,58,0.15) 0%, rgba(15,23,42,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} 
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Ready to Build Your Next <span style={{ color: '#C41E3A' }}>Great Team?</span>
        </h2>

        <p style={{ fontSize: '1.15rem', color: '#94A3B8', maxWidth: '650px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Whether you're hiring one critical leader or building an entire workforce, we're ready to help.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={onOpenContactModal}
            style={{
              backgroundColor: '#C41E3A',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '16px 32px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(196, 30, 58, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#991B1B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#C41E3A';
            }}
          >
            Talk to Our Recruitment Team
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '16px 32px',
              borderRadius: '8px',
              border: '2px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Explore Our Services
          </button>
        </div>
      </div>
    </section>
  );
}
