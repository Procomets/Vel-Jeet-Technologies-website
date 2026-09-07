import React from 'react';
import { companyProfileData } from '../data/companyData';

export default function Footer({ onOpenContactModal }) {
  const { contact } = companyProfileData;

  return (
    <footer 
      id="contact" 
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        paddingTop: '80px',
        paddingBottom: '30px',
        borderTop: '4px solid #C41E3A',
        position: 'relative'
      }}
    >
      <div 
        className="pattern-dots-dark" 
        style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }} 
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Main Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <img 
                src="/images/logo.png" 
                alt="Vel Jeet Technologies Logo" 
                style={{ 
                  height: '68px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  padding: '6px 14px',
                  display: 'inline-block' 
                }} 
              />
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
              {companyProfileData.heroQuote}
            </p>

            <div style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
              100% Statutory Compliant HR Partner
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px', borderBottom: '2px solid #C41E3A', paddingBottom: '8px', display: 'inline-block' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
              <li><a href="#overview">Company Overview</a></li>
              <li><a href="#mission">Mission & Vision</a></li>
              <li><a href="#services">Services Portfolio</a></li>
              <li><a href="#industries">Industries We Serve</a></li>
              <li><a href="#why-choose-us">The Vel Jeet Advantage</a></li>
              <li><a href="#testimonials">Client Testimonials</a></li>
            </ul>
          </div>

          {/* Services List */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px', borderBottom: '2px solid #C41E3A', paddingBottom: '8px', display: 'inline-block' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
              <li>Permanent Staffing</li>
              <li>Executive Search</li>
              <li>Bulk Hiring & Volume Drives</li>
              <li>Payroll Management</li>
              <li>HR Outsourcing (HRO)</li>
            </ul>
          </div>

          {/* Contact Details (Verbatim Page 9 PDF) */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px', borderBottom: '2px solid #C41E3A', paddingBottom: '8px', display: 'inline-block' }}>
              Contact Information
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Location:</strong>
                <span style={{ color: '#CBD5E1' }}>{contact.location}</span>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Email Us:</strong>
                <a href={`mailto:${contact.email}`} style={{ color: '#FCA5A5' }}>{contact.email}</a>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Website:</strong>
                <span style={{ color: '#CBD5E1' }}>{contact.website}</span>
              </div>

              <button 
                className="btn-primary-red"
                onClick={onOpenContactModal}
                style={{ marginTop: '10px', padding: '10px 18px', fontSize: '0.85rem' }}
              >
                Send Direct Message
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div 
          style={{
            paddingTop: '24px',
            borderTop: '1px solid #222222',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: '#64748B'
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>Procomets Solutions</strong>. All Rights Reserved. Chennai, Tamil Nadu, India.
          </div>

          
        </div>

      </div>
    </footer>
  );
}
