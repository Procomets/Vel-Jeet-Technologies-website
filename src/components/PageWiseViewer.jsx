import React, { useState } from 'react';
import { FileText, CheckCircle, Search, Mail, Globe, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { companyProfileData } from '../data/companyData';

export default function PageWiseViewer({ onOpenContactModal }) {
  const { pdfPagesData } = companyProfileData;
  const [selectedPage, setSelectedPage] = useState(1);

  const currentPage = pdfPagesData.find(p => p.pageNumber === selectedPage) || pdfPagesData[0];

  return (
    <section 
      style={{
        padding: '60px 0 90px',
        backgroundColor: '#F8FAF9',
        minHeight: '80vh'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Page Header */}
        <div style={{ textAlignment: 'center', marginBottom: '40px' }}>
          <div className="badge-pill-red" style={{ marginBottom: '12px' }}>
            <FileText size={14} />
            PDF COMPANY PROFILE — PAGE-BY-PAGE CONTENT EXTRACTION
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A' }}>
            Vel Jeet Technologies <span style={{ color: '#C41E3A' }}>SEO Content & Page Structure</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '8px' }}>
            Select any page below (1 to 9) to inspect its exact extracted content, SEO keywords, titles, meta tags, and structured web layout.
          </p>
        </div>

        {/* Page Selector Tabs Bar */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '32px',
            borderBottom: '2px solid #E2E8F0'
          }}
        >
          {pdfPagesData.map((page) => {
            const isActive = selectedPage === page.pageNumber;
            return (
              <button
                key={page.pageNumber}
                onClick={() => setSelectedPage(page.pageNumber)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive ? '#C41E3A' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #C41E3A' : '1px solid #CBD5E1',
                  boxShadow: isActive ? '0 6px 16px rgba(196, 30, 58, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Page {page.pageNumber}: {page.title.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Selected Page Content Display */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '40px'
          }}
        >
          {/* Left Column: Page Metadata & SEO Card */}
          <div 
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '28px',
              height: 'fit-content'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FCA5A5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              SEO SPECIFICATIONS
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Page {currentPage.pageNumber}: {currentPage.title}
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>
                Meta Title Tag:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#FEE2E2', fontWeight: 600, backgroundColor: '#1E293B', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #C41E3A' }}>
                {currentPage.seoTitle}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>
                Meta Description:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#CBD5E1', backgroundColor: '#1E293B', padding: '10px 12px', borderRadius: '6px', lineHeight: 1.5 }}>
                {currentPage.seoDesc}
              </div>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid #334155' }}>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700 }}>
                Primary Keywords:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#C41E3A', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px' }}>Recruitment Chennai</span>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#334155', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px' }}>HR Partner</span>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#334155', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px' }}>Vel Jeet Technologies</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verbatim PDF Content Render */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#C41E3A' }}>VERBATIM & EXTENDED CONTENT</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>{currentPage.title}</h2>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', color: '#C41E3A', fontWeight: 800, fontSize: '0.9rem', padding: '6px 14px', borderRadius: '20px' }}>
                PDF Page #{currentPage.pageNumber}
              </div>
            </div>

            {/* Render Page Specific Raw Content */}
            {currentPage.pageNumber === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #991B1B 100%)', color: '#FFFFFF', padding: '30px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', fontWeight: 800, opacity: 0.8 }}>{currentPage.rawContent.heading}</div>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', margin: '10px 0' }}>{currentPage.rawContent.companyName}</h1>
                  <div style={{ fontSize: '0.9rem', letterSpacing: '0.1em', fontWeight: 700, color: '#FCA5A5' }}>{currentPage.rawContent.tagline}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #0F172A' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#64748B' }}>BRAND PILLARS:</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentPage.rawContent.pillars}</div>
                </div>
                <div style={{ backgroundColor: '#FEF2F2', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #C41E3A' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#991B1B' }}>FEATURED QUOTE:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#C41E3A', fontStyle: 'italic', marginTop: '4px' }}>{currentPage.rawContent.quote}</div>
                </div>
              </div>
            )}

            {currentPage.pageNumber === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{currentPage.rawContent.heading}</h3>
                <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '12px', lineHeight: 1.7, fontSize: '1.05rem', color: '#334155' }}>
                  {currentPage.rawContent.text1}
                </div>
                <div style={{ backgroundColor: '#FEF2F2', padding: '24px', borderRadius: '12px', lineHeight: 1.7, fontSize: '1.05rem', color: '#991B1B' }}>
                  {currentPage.rawContent.text2}
                </div>
              </div>
            )}

            {currentPage.pageNumber === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ backgroundColor: '#FEF2F2', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #C41E3A' }}>
                    <h4 style={{ fontWeight: 800, color: '#C41E3A', marginBottom: '8px' }}>{currentPage.rawContent.missionHeading}</h4>
                    <p style={{ color: '#475569', fontSize: '0.95rem' }}>{currentPage.rawContent.missionText}</p>
                  </div>
                  <div style={{ backgroundColor: '#F1F5F9', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #0F172A' }}>
                    <h4 style={{ fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{currentPage.rawContent.visionHeading}</h4>
                    <p style={{ color: '#475569', fontSize: '0.95rem' }}>{currentPage.rawContent.visionText}</p>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>{currentPage.rawContent.servicesHeading}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentPage.rawContent.servicesList.map((s, idx) => (
                      <div key={idx} style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <strong style={{ color: '#C41E3A', display: 'block', fontSize: '1.05rem' }}>{s.title}</strong>
                        <span style={{ color: '#475569', fontSize: '0.95rem' }}>{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPage.pageNumber === 4 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>{currentPage.rawContent.heading}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {currentPage.rawContent.industries.map((ind, idx) => (
                    <div key={idx} style={{ padding: '20px', backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', borderLeft: '4px solid #C41E3A' }}>
                      ▶ {ind}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage.pageNumber === 5 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>{currentPage.rawContent.heading}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {currentPage.rawContent.points.map((pt, idx) => (
                    <div key={idx} style={{ padding: '18px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FCA5A5', color: '#991B1B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle size={18} color="#C41E3A" />
                      {pt}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage.pageNumber === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{currentPage.rawContent.heading}</h3>
                <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '12px', lineHeight: 1.7, fontSize: '1.05rem', color: '#334155' }}>
                  {currentPage.rawContent.text1}
                </div>
                <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '24px', borderRadius: '12px', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  {currentPage.rawContent.text2}
                </div>
              </div>
            )}

            {currentPage.pageNumber === 7 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>{currentPage.rawContent.heading}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentPage.rawContent.reviews.map((r, idx) => (
                    <div key={idx} style={{ padding: '20px', backgroundColor: '#FDFBF7', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <p style={{ fontStyle: 'italic', color: '#334155', marginBottom: '8px' }}>"{r.text}"</p>
                      <strong style={{ color: '#C41E3A' }}>— {r.name}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage.pageNumber === 8 && (
              <div style={{ backgroundColor: '#FDFBF7', padding: '60px', borderRadius: '16px', textAlignment: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', color: '#64748B', fontWeight: 600 }}>{currentPage.rawContent.subtext}</div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#C41E3A', marginTop: '10px' }}>{currentPage.rawContent.heading}</h1>
              </div>
            )}

            {currentPage.pageNumber === 9 && (
              <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '40px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                  <MapPin color="#C41E3A" />
                  <strong>Location:</strong> {currentPage.rawContent.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                  <Mail color="#C41E3A" />
                  <strong>Email:</strong> {currentPage.rawContent.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                  <Globe color="#C41E3A" />
                  <strong>Website:</strong> {currentPage.rawContent.website}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
