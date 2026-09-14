import React, { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer({ onOpenContactModal }) {
  const { contact } = companyProfileData;
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      id="contact" 
      ref={footerRef}
      style={{
        backgroundColor: '#000000', // Pure black
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Subtle Dark Radial Glow (Optional/Subtle) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(196,30,58,0.03) 0%, rgba(5,11,20,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      {/* Pattern Overlay */}
      <div 
        className="pattern-dots-dark" 
        style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', zIndex: 0 }} 
      />

      {/* Main Content Area - Upper/Middle */}
      <div 
        className="footer-content-wrapper"
        style={{ 
          maxWidth: '1280px', 
          width: '100%',
          margin: '0 auto', 
          padding: '60px 24px 20px', 
          position: 'relative', 
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        
        {/* Main Footer Grid */}
        <div className={`footer-grid ${isVisible ? 'animate-in' : ''}`}>
          
          {/* Column 1: Brand Info */}
          <div className="footer-col-brand col-animate" style={{ '--delay': '0ms' }}>
            <div className="footer-logo-wrapper" style={{ marginBottom: '16px' }}>
              <img 
                src="/images/logo.png" 
                alt="Vel Jeet Technologies Logo" 
                style={{ 
                  height: '64px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  padding: '6px 14px',
                  display: 'inline-block' 
                }} 
              />
            </div>
            <p className="footer-brand-desc" style={{ fontSize: '0.98rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '8px', maxWidth: '320px' }}>
              We don't just fill positions, we fuel your company's success.
            </p>
            <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 600, marginBottom: '20px' }}>
              100% Statutory Compliant HR Partner
            </div>
            
            {/* Social Icons - Instagram & LinkedIn */}
            <div className="footer-social-wrapper" style={{ display: 'flex', gap: '12px' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
                <LinkedInIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col col-animate" style={{ '--delay': '100ms' }}>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#overview">Company Overview</a></li>
              <li><a href="#mission">Mission & Vision</a></li>
              <li><a href="#services">Services Portfolio</a></li>
              <li><a href="#industries">Industries We Serve</a></li>
              <li><a href="#why-choose-us">The Vel Jeet Advantage</a></li>
              <li><a href="#testimonials">Client Testimonials</a></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-col col-animate" style={{ '--delay': '200ms' }}>
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Permanent Staffing</a></li>
              <li><a href="#services">Executive Search</a></li>
              <li><a href="#services">Bulk Hiring & Volume Recruitment</a></li>
              <li><a href="#services">Payroll Management</a></li>
              <li><a href="#services">HR Outsourcing (HRO)</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="footer-col col-animate" style={{ '--delay': '300ms' }}>
            <h4 className="footer-heading">Contact Information</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <strong className="contact-label">Phone</strong>
                <a href="tel:9677555369" className="contact-value" style={{ color: '#FFFFFF', fontWeight: 700, textDecoration: 'none' }}>
                  +91 96775 55369
                </a>
              </div>
              <div className="contact-item">
                <strong className="contact-label">Email</strong>
                <a href={`mailto:${contact.email}`} className="contact-value contact-email">{contact.email}</a>
              </div>
              <div className="contact-item">
                <strong className="contact-label">Location</strong>
                <span className="contact-value">Chennai, Tamil Nadu – India</span>
              </div>
              <div className="contact-item">
                <strong className="contact-label">Website</strong>
                <a href={`http://${contact.website}`} className="contact-value">{contact.website}</a>
              </div>
              <button 
                className="btn-primary-red footer-btn"
                onClick={onOpenContactModal}
                style={{ marginTop: '10px', padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Send Direct Message
              </button>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className={`col-animate`} style={{ '--delay': '400ms', width: '100%', marginTop: '24px' }}>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Vel Jeet Technologies. All Rights Reserved. Chennai, Tamil Nadu, India.</p>
          </div>
        </div>

      </div>

      {/* HUGE Oversized Brand Typography at the very bottom */}
      <div className="footer-wordmark" aria-hidden="true">
        VEL JEET
      </div>

      <style>
        {`
          .footer-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
            gap: 32px;
          }
          
          /* Staggered Animations */
          .col-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--delay), 
                        transform 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--delay);
          }
          
          .animate-in .col-animate, .animate-in.col-animate {
            opacity: 1;
            transform: translateY(0);
          }
          
          .footer-heading {
            font-size: 1.05rem;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 12px;
            letter-spacing: 0.02em;
          }
          
          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          
          .footer-links a {
            color: #94A3B8; /* Muted blue-gray */
            text-decoration: none;
            font-size: 0.92rem;
            transition: all 0.3s ease;
            display: inline-block;
          }
          
          .footer-links a:hover {
            color: #C41E3A; /* Vel-Jeet Crimson */
            transform: translateX(4px);
          }
          
          .footer-contact {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .contact-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          
          .contact-label {
            color: #E2E8F0;
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
          }
          
          .contact-value {
            color: #94A3B8;
            font-size: 0.92rem;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          a.contact-value:hover {
            color: #FFFFFF;
          }
          
          .contact-email {
            color: #C41E3A;
            transition: color 0.3s ease;
          }
          
          .contact-email:hover {
            color: #E11D48;
          }
          
          .footer-btn {
            align-self: flex-start;
          }
          
          .footer-social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid #1E293B;
            background-color: transparent;
            color: #94A3B8;
            transition: all 0.3s ease;
          }
          
          .footer-social-link:hover {
            border-color: #C41E3A;
            color: #FFFFFF;
            background-color: #C41E3A;
            transform: translateY(-3px);
          }
          
          .footer-divider {
            height: 1px;
            width: 100%;
            background-color: #1E293B;
            margin-bottom: 16px;
          }
          
          .footer-bottom {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 0.9rem;
            color: #64748B;
            margin-bottom: 24px;
          }
          
          .footer-bottom p {
            margin: 0;
          }
          
          /* HUGE Oversized Wordmark */
          .footer-wordmark {
            font-size: clamp(80px, 16vw, 240px);
            font-weight: 900;
            line-height: 0.8;
            letter-spacing: -0.06em;
            white-space: nowrap;
            color: rgba(255,255,255,0.06);
            position: absolute;
            left: 50%;
            bottom: -15px;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 1;
          }
          
          /* Responsive Layout */
          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 60px 40px;
            }
            .footer-col-brand {
              grid-column: 1 / -1; 
            }
            .footer-wordmark {
              font-size: clamp(100px, 18vw, 160px);
            }
          }
          
          @media (max-width: 768px) {
            .footer-content-wrapper {
              padding: 36px 16px 12px;
            }
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 28px;
              text-align: center;
            }
            .footer-col-brand {
              grid-column: 1 / -1;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .footer-brand-desc {
              margin-left: auto !important;
              margin-right: auto !important;
            }
            .footer-social-wrapper {
              justify-content: center;
            }
            .footer-col {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .footer-heading {
              text-align: center;
              margin-bottom: 12px;
            }
            .footer-links {
              align-items: center;
            }
            .footer-links a:hover {
              transform: translateY(-2px);
            }
            .footer-contact {
              align-items: center;
              text-align: center;
            }
            .contact-item {
              align-items: center;
              text-align: center;
            }
            .footer-btn {
              align-self: center !important;
            }
            .footer-bottom {
              justify-content: center;
              text-align: center;
              margin-bottom: 12px;
            }
            .footer-bottom p {
              text-align: center;
              font-size: 0.82rem;
            }
            .footer-wordmark {
              font-size: clamp(50px, 13vw, 85px);
              bottom: -10px;
            }
          }
        `}
      </style>
    </footer>
  );
}
