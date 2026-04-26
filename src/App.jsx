import React, { useState, useEffect, useRef } from 'react';
import { Download, RefreshCw, Shield, Activity, BarChart2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import richeeseLogoSrc from './assets/richeese-logo.jpg';

import Sidebar from './components/Sidebar';
import KPISection from './components/KPISection';
import CapabilitySection from './components/CapabilitySection';
import RiskRCASection from './components/RiskRCASection';
import GovernancePanel from './components/GovernancePanel';
import BottomSection from './components/BottomSection';

const ALL_FINDINGS = [
  { domain: 'DSS05', code: 'DSS05.04', observation: 'Kontrol akses lemah karena berbagi kredensial administratif', risk: 'Tinggi', recommendation: 'Implementasi role-based access control dan audit log akses', status: 'Open', rootCause: 'SDM' },
  { domain: 'APO12', code: 'APO12.01', observation: 'Pelacakan inventaris masih manual', risk: 'Sedang', recommendation: 'Implementasi sistem inventaris otomatis berbasis barcode scanning', status: 'Monitoring', rootCause: 'Integritas Data' },
  { domain: 'MEA01', code: 'MEA01.03', observation: 'Monitoring log sistem belum dilakukan rutin', risk: 'Tinggi', recommendation: 'Monitoring sistem otomatis dan pelaporan log berkala', status: 'Open', rootCause: 'Infrastruktur' },
  { domain: 'DSS05', code: 'DSS05.02', observation: 'Prosedur pencadangan data operasional belum terdokumentasi dan diuji secara berkala', risk: 'Tinggi', recommendation: 'Standarisasi SOP backup data harian ke storage off-site', status: 'Open', rootCause: 'Backup Data' },
];

const SECTIONS = ['section-kpi', 'section-capability', 'section-risk', 'section-governance', 'section-findings'];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [domainFilter, setDomainFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rootCauseFilter, setRootCauseFilter] = useState('');
  const [exporting, setExporting] = useState(false);
  const [activeSection, setActiveSection] = useState('section-kpi');

  const clearFilters = () => { setDomainFilter(''); setRiskFilter(''); setStatusFilter(''); setRootCauseFilter(''); };

  const filteredFindings = ALL_FINDINGS.filter(f =>
    (!domainFilter || f.domain === domainFilter) &&
    (!riskFilter || f.risk === riskFilter) &&
    (!statusFilter || f.status === statusFilter) &&
    (!rootCauseFilter || f.rootCause === rootCauseFilter)
  );

  const handleExportPDF = () => {
    setExporting(true);
    const el = document.getElementById('dashboard-content');
    html2pdf().set({
      margin: 0.3,
      filename: 'Laporan_Audit_COBIT_Richeese_2026.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' }
    }).from(el).save().then(() => setExporting(false));
  };

  // Intersection observer to highlight active sidebar nav item
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const domainMeta = [
    { code: 'DSS05', full: 'Security Services',      icon: <Shield size={14} />,   color: '#E21C2B' },
    { code: 'APO12', full: 'Risk Management',         icon: <Activity size={14} />, color: '#D97706' },
    { code: 'MEA01', full: 'Performance Monitoring',  icon: <BarChart2 size={14} />, color: '#1d4ed8' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter',sans-serif", color: '#1e293b', background: '#f1f5f9' }}>

      {/* ── SIDEBAR ── */}
      <Sidebar
        collapsed={collapsed} setCollapsed={setCollapsed}
        domainFilter={domainFilter} setDomainFilter={setDomainFilter}
        riskFilter={riskFilter}   setRiskFilter={setRiskFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        clearFilters={clearFilters}
        activeSection={activeSection}
        exporting={exporting}
        onExport={handleExportPDF}
      />

      {/* ── PAGE BODY ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'auto' }}>

        {/* ── TOP HEADER BAR ── */}
        <header style={{ background: '#fff', borderBottom: '2px solid #E21C2B', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(226,28,43,0.07)' }}>
          <div style={{ padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            {/* Logo + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ height: 44, width: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 10px rgba(226,28,43,0.25)' }}>
                <img src={richeeseLogoSrc} alt="Richeese Factory" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div>
                <h1 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                  Evaluasi Capability Level Tata Kelola Sistem Informasi
                </h1>
                <p style={{ fontSize: 11, color: '#64748b', margin: 0, fontWeight: 500, marginTop: 2 }}>
                  Outlet Richeese Factory — Berbasis COBIT 2019
                </p>
              </div>
            </div>

            {/* Domain badges + period */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              {domainMeta.map(d => (
                <div key={d.code} style={{ display: 'flex', alignItems: 'center', gap: 5, background: `${d.color}11`, border: `1px solid ${d.color}44`, borderRadius: 7, padding: '4px 10px' }}>
                  <span style={{ color: d.color }}>{d.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: d.color }}>{d.code}</span>
                </div>
              ))}
              <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '4px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Periode</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>2026</div>
              </div>

              {/* Header-level Export (visible when sidebar is collapsed) */}
              {collapsed && (
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, background: exporting ? '#9ca3af' : 'linear-gradient(135deg,#E21C2B,#be123c)', color: '#fff', border: 'none', borderRadius: 9, padding: '8px 16px', fontWeight: 700, fontSize: 12, cursor: exporting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(226,28,43,0.3)', fontFamily: "'Inter',sans-serif" }}>
                  {exporting ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={14} />}
                  {exporting ? 'Mengekspor...' : 'Ekspor PDF'}
                </button>
              )}
            </div>
          </div>

          {/* Audit context sub-bar */}
          <div style={{ background: 'linear-gradient(90deg,#E21C2B,#9f1239)', padding: '6px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {[
                ['Standar', 'COBIT 2019 – ISACA'],
                ['Auditor', 'Tim Audit Sistem Informasi'],
                ['Scope', 'Operasional IT Outlet'],
                ['Laporan', 'Kritis – Tindak Lanjut Diperlukan'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{k}:</span>
                  <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main id="dashboard-content" style={{ flex: 1, padding: '28px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div id="section-kpi" style={{ scrollMarginTop: 110 }}>
            <KPISection />
          </div>

          <div id="section-capability" style={{ scrollMarginTop: 110 }}>
            <CapabilitySection domainFilter={domainFilter} setDomainFilter={setDomainFilter} />
          </div>

          <div id="section-risk" style={{ scrollMarginTop: 110 }}>
            <RiskRCASection
              riskFilter={riskFilter} setRiskFilter={setRiskFilter}
              rootCauseFilter={rootCauseFilter} setRootCauseFilter={setRootCauseFilter}
            />
          </div>

          <div id="section-governance" style={{ scrollMarginTop: 110 }}>
            <GovernancePanel />
          </div>

          <div id="section-findings" style={{ scrollMarginTop: 110 }}>
            <BottomSection
              domainFilter={domainFilter} setDomainFilter={setDomainFilter}
              riskFilter={riskFilter} setRiskFilter={setRiskFilter}
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              clearFilters={clearFilters}
              filteredFindings={filteredFindings}
            />
          </div>

        </main>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid #e2e8f0', padding: '16px 28px', textAlign: 'center', background: '#fff' }}>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontWeight: 500 }}>
            © 2026 Richeese Factory · Dashboard Audit COBIT 2019 · 2026 · Dokumen Bersifat Rahasia
          </p>
        </footer>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
