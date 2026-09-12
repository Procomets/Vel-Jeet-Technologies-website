import React from 'react';
import { Settings, Zap, ArrowUpRight } from 'lucide-react';

export default function BlackBanner({ onOpenContactModal }) {
  return (
    <section 
      style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        padding: '32px 0',
        borderTop: '3px solid #C41E3A',
        borderBottom: '3px solid #C41E3A',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        className="pattern-dots-dark" 
        style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} 
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#C41E3A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(196, 30, 58, 0.5)'
              }}
            >
              <Zap size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FCA5A5', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                RECRUITMENT DISCOVERY & HIRING AGILITY
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.02em', margin: 0 }}>
                ACCELERATE HIRING DISCOVERY. UNCOMPLICATE HR MANAGEMENT.
              </h2>
            </div>
          </div>

          <button 
            onClick={onOpenContactModal}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
            }}
          >
            Get Custom Quote
            <ArrowUpRight size={16} color="#C41E3A" />
          </button>

        </div>
      </div>
    </section>
  );
}
