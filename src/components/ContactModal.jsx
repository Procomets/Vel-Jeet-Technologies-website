import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, Phone, User, Building, Loader2, AlertCircle } from 'lucide-react';
import { GOOGLE_SHEETS_SCRIPT_URL } from '../config';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceInterest: 'Permanent Staffing',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (GOOGLE_SHEETS_SCRIPT_URL) {
        // Submit via hidden form targeting a hidden iframe to prevent
        // script.googleusercontent.com 302 redirect from triggering net::ERR_CONNECTION_RESET
        const iframeName = 'hidden_gscript_iframe';
        let iframe = document.getElementById(iframeName);
        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.id = iframeName;
          iframe.name = iframeName;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = GOOGLE_SHEETS_SCRIPT_URL;
        form.target = iframeName;
        form.style.display = 'none';

        const fields = {
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          serviceInterest: formData.serviceInterest,
          message: formData.message,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        Object.entries(fields).forEach(([key, val]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = val;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
          if (form.parentNode) {
            form.parentNode.removeChild(form);
          }
        }, 1000);
      }

      setSubmitted(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceInterest: 'Permanent Staffing',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Could not record details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '28px 32px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.06)',
          position: 'relative'
        }}
      >
        {/* Minimal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div>
            
            
            
          </div>

          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              backgroundColor: '#F1F5F9',
              border: 'none',
              color: '#64748B',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.2s, color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E2E8F0'; e.currentTarget.style.color = '#0F172A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '36px 16px' }}>
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#f4fef2ff',
                color: '#2cc41eff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle size={32} />
            </div>
            <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
              Inquiry Submitted Successfully!
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
              Thank you for reaching out. Our team will contact you within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      fontSize: '0.88rem',
                      outline: 'none',
                      color: '#0F172A',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#C41E3A'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Company Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Acme Tech"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      fontSize: '0.88rem',
                      outline: 'none',
                      color: '#0F172A',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#C41E3A'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Work Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input 
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      fontSize: '0.88rem',
                      outline: 'none',
                      color: '#0F172A',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#C41E3A'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Phone / WhatsApp *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      fontSize: '0.88rem',
                      outline: 'none',
                      color: '#0F172A',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#C41E3A'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                Service Required
              </label>
              <select
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.88rem',
                  color: '#0F172A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#C41E3A'; e.target.style.backgroundColor = '#FFFFFF'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
              >
                <option value="Permanent Staffing">Permanent Staffing</option>
                <option value="Executive Search">Executive Search / Headhunting</option>
                <option value="Bulk Hiring / Volume Recruitment">Bulk Hiring / Volume Recruitment</option>
                <option value="Payroll Management">Payroll Management</option>
                <option value="HR Outsourcing">HR Outsourcing (HRO)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
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
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.88rem',
                  outline: 'none',
                  resize: 'none',
                  color: '#0F172A',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#C41E3A'; e.target.style.backgroundColor = '#FFFFFF'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
              />
            </div>

            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#FEF2F2',
                borderRadius: '8px',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                fontSize: '0.84rem'
              }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: isSubmitting ? '#991B1B' : '#C41E3A',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.8 : 1,
                marginTop: '6px',
                boxShadow: '0 4px 14px rgba(196, 30, 58, 0.25)',
                transition: 'background-color 0.2s, transform 0.15s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundColor = '#A01830'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
              onMouseLeave={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundColor = '#C41E3A'; e.currentTarget.style.transform = 'translateY(0)'; } }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Saving Details...
                </>
              ) : (
                <>
                  Submit Hiring Request
                  <Send size={15} />
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
