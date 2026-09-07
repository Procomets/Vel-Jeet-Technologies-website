import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, Phone, MapPin, User, Building, MessageSquare } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceInterest: 'Permanent Staffing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div 
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '24px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '3px solid #C41E3A'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src="/images/logo.png" 
              alt="Vel Jeet Technologies Logo" 
              style={{ 
                height: '46px', 
                width: 'auto', 
                backgroundColor: '#FFFFFF', 
                padding: '4px 10px', 
                borderRadius: '8px' 
              }} 
            />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FCA5A5', letterSpacing: '0.1em' }}>
                DIRECT HIRING INQUIRY
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Partner With <span style={{ color: '#FCA5A5' }}>Vel Jeet Technologies</span>
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '30px' }}>
          {submitted ? (
            <div style={{ textAlignment: 'center', textAlign: 'center', padding: '40px 20px' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF2F2',
                  color: '#C41E3A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Inquiry Submitted Successfully!</h4>
              <p style={{ color: '#64748B', marginTop: '8px' }}>
                Thank you for contacting Vel Jeet Technologies. Our senior HR consultant will contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Company Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Acme Tech Solutions"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Work Email *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input 
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Phone / WhatsApp *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input 
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Service Required
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Permanent Staffing">Permanent Staffing</option>
                  <option value="Executive Search">Executive Search / Headhunting</option>
                  <option value="Bulk Hiring / Volume Recruitment">Bulk Hiring / Volume Recruitment</option>
                  <option value="Payroll Management">Payroll Management</option>
                  <option value="HR Outsourcing">HR Outsourcing (HRO)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Hiring Requirements & Details
                </label>
                <textarea 
                  rows={3}
                  placeholder="Describe your hiring needs, roles, experience levels, and timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <button 
                type="submit"
                className="btn-primary-red"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                Submit Hiring Request
                <Send size={16} />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
