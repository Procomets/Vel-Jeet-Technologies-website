import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Globe, ChevronRight, Menu, X } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function Header({ onOpenContactModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isInServicesSection, setIsInServicesSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 30);

      // Check if user is currently inside the Services section (#services)
      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        const rect = servicesEl.getBoundingClientRect();
        // If Services section has reached the top area and is currently being viewed
        if (rect.top <= 100 && rect.bottom >= 100) {
          setIsInServicesSection(true);
          setIsVisible(false);
          lastScrollY.current = currentScrollY;
          return;
        } else {
          setIsInServicesSection(false);
        }
      }

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transform: isInServicesSection ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isInServicesSection ? 'none' : 'auto'
      }}
    >
      {/* Top Utility Contact Bar */}
      <div 
        style={{
          backgroundColor: '#000000',
          color: '#94A3B8',
          fontSize: '0.8rem',
          padding: '6px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          zIndex: 1002
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a href="tel:9677555369" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F1F5F9', textDecoration: 'none', fontWeight: 600 }}>
            <Phone size={13} color="#C41E3A" />
            +91 96775 55369
          </a>
          <a href={`mailto:${companyProfileData.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', textDecoration: 'none' }}>
            <Mail size={13} color="#C41E3A" />
            {companyProfileData.contact.email}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
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
                height: '40px', 
                width: 'auto', 
                objectFit: 'contain',
                display: 'block' 
              }} 
            />
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.015em' }}>
              Vel Jeet Technologies
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav-links">
            <a href="#overview">Overview</a>
            <a href="#mission">Mission</a>
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#why-choose-us">Why Us</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn-primary-red"
              onClick={onOpenContactModal}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Hire Talent
              <ChevronRight size={14} />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} color="#0F172A" /> : <Menu size={22} color="#0F172A" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#overview" onClick={closeMobileMenu}>Overview</a>
            <a href="#mission" onClick={closeMobileMenu}>Mission</a>
            <a href="#services" onClick={closeMobileMenu}>Services</a>
            <a href="#industries" onClick={closeMobileMenu}>Industries</a>
            <a href="#why-choose-us" onClick={closeMobileMenu}>Why Us</a>
            <a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a>
            <a href="#contact" onClick={closeMobileMenu}>Contact</a>
          </div>
        )}

      </div>

      {/* Embedded CSS for responsive Header */}
      <style>
        {`
          .desktop-nav-links {
            display: flex;
            align-items: center;
            gap: 24px;
          }

          .desktop-nav-links a {
            font-weight: 500;
            font-size: 0.88rem;
            color: #334155;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .desktop-nav-links a:hover {
            color: #C41E3A;
          }

          .mobile-menu-toggle-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
          }

          .mobile-nav-drawer {
            display: flex;
            flex-direction: column;
            backgroundColor: #FFFFFF;
            border-top: 1px solid #E2E8F0;
            padding: 16px 24px;
            gap: 14px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }

          .mobile-nav-drawer a {
            font-size: 0.95rem;
            font-weight: 600;
            color: #0F172A;
            text-decoration: none;
            padding: 6px 0;
            border-bottom: 1px solid #F1F5F9;
          }

          @media (max-width: 992px) {
            .desktop-nav-links {
              display: none !important;
            }
            .mobile-menu-toggle-btn {
              display: inline-flex !important;
            }
          }
        `}
      </style>
    </header>
  );
}
