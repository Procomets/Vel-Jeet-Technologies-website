import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Globe, ChevronRight, Menu, X } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Header({ onOpenContactModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 30);

      // Always keep visible when near the top of the page
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;
      
      // Minimum 8px threshold before toggling to prevent micro-scroll vibration
      if (Math.abs(diff) > 8) {
        if (diff > 0) {
          // Scrolling DOWN -> hide navbar
          setIsVisible(false);
        } else {
          // Scrolling UP -> reveal navbar
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Top Utility Contact Bar - Always Visible */}
      <div 
        style={{
          backgroundColor: '#000000',
          color: '#94A3B8',
          fontSize: '0.8rem',
          padding: '4px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          zIndex: 1002
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
              <strong>Location:</strong> {companyProfileData.contact.location}
            </span>
            <a href={`mailto:${companyProfileData.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
              <Mail size={13} color="#C41E3A" />
              {companyProfileData.contact.email}
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#F1F5F9', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={13} color="#C41E3A" />
              {companyProfileData.contact.website}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Auto-hides on scroll down & reappears on scroll up */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid #E2E8F0',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
          position: 'relative',
          zIndex: 1001
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Brand Logo & Emblem */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src="/images/logo.png" 
              alt="Vel Jeet Technologies Logo" 
              style={{ 
                height: '44px', 
                width: 'auto', 
                objectFit: 'contain',
                display: 'block' 
              }} 
            />
            <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Vel Jeet Technologies
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#overview" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Overview</a>
            <a href="#mission" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Mission</a>
            <a href="#services" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Services</a>
            <a href="#industries" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Industries</a>
            <a href="#why-choose-us" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Why Us</a>
            <a href="#testimonials" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Testimonials</a>
            <a href="#contact" style={{ fontWeight: 500, fontSize: '0.88rem', color: '#334155' }}>Contact</a>
          </nav>

          {/* Primary Contact CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn-primary-red"
              onClick={onOpenContactModal}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Hire Talent
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
