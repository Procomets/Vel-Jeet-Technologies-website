import React, { useState } from 'react';
import { Users, UserCheck, Layers, Calculator, ShieldCheck, Check, ArrowRight, Sparkles } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

const iconMap = {
  Users: Users,
  UserCheck: UserCheck,
  Layers: Layers,
  Calculator: Calculator,
  ShieldCheck: ShieldCheck
};

export default function Services({ onOpenContactModal }) {
  const { services } = companyProfileData;
  const [activeTab, setActiveTab] = useState(services[0].id);

  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (
    <section 
      id="services" 
      style={{
        padding: '90px 0',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A' }}>
            End-to-End <span style={{ color: '#C41E3A' }}>Human Resource Solutions</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '10px' }}>
            Tailored recruitment and workforce management services engineered for startups, SMEs, and global enterprises across India.
          </p>
        </div>

        {/* Key Outputs / Service Selector Row (Styled like Reference Image 1 Top Row) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '40px'
          }}
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Users;
            const isActive = activeTab === service.id;

            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                style={{
                  backgroundColor: isActive ? '#C41E3A' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#334155',
                  padding: '20px 16px',
                  borderRadius: '10px',
                  border: isActive ? '2px solid #C41E3A' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 10px 24px rgba(196, 30, 58, 0.25)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'center',
                  transition: 'all 0.25s ease'
                }}
              >
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : '#FEF2F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#FFFFFF' : '#C41E3A'
                  }}
                >
                  <IconComponent size={22} />
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: 800 }}>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Feature Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #FDFBF7 0%, #FFFFFF 100%)',
            border: '2px solid #FEF2F2',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Details */}
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
              {activeService.title}
            </h3>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
              {activeService.fullDesc}
            </p>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Key Deliverables & Capabilities:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '30px' }}>
              {activeService.deliverables.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#334155', fontWeight: 600 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={14} />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <button 
              className="btn-primary-red"
              onClick={onOpenContactModal}
            >
              Inquire About {activeService.title}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Preview Box with Photo */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                border: '3px solid #FFFFFF'
              }}
            >
              <img 
                src="/images/services.jpg" 
                alt={activeService.title}
                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div 
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '14px 20px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: '0 10px 24px rgba(0,0,0,0.2)'
              }}
            >
              Target Roles: <span style={{ color: '#FCA5A5' }}>{activeService.targetRoles}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
