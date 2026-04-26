import React, { useState, useEffect } from 'react';
import richeeseLogoSrc from '../assets/richeese-logo.jpg';
import {
  LayoutDashboard, BarChart2, PieChart, Shield, Table2,
  ChevronLeft, ChevronRight, Download, RefreshCw,
  AlertTriangle, Activity, BookOpen, Info, Filter, X
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'section-kpi',        label: 'Executive Summary',     sublabel: 'KPI Utama',              icon: LayoutDashboard },
  { id: 'section-capability', label: 'Capability Level',      sublabel: 'Area & Domain',           icon: BarChart2 },
  { id: 'section-risk',       label: 'Analisis Risiko',       sublabel: 'Distribusi & Root Cause', icon: PieChart },
  { id: 'section-governance', label: 'Governance Panel',      sublabel: 'COBIT Design Factors',    icon: Shield },
  { id: 'section-findings',   label: 'Temuan Audit',          sublabel: 'Tabel & Filter',          icon: Table2 },
];

const DOMAIN_ITEMS = [
  { code: 'DSS05', label: 'Security Services',      color: '#E21C2B', bg: '#fef2f2', border: '#fecaca' },
  { code: 'APO12', label: 'Risk Management',        color: '#D97706', bg: '#fffbeb', border: '#fde68a' },
  { code: 'MEA01', label: 'Performance Monitoring', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
];

const RISK_ITEMS = [
  { value: 'Tinggi', label: 'Risiko Tinggi',  color: '#DC2626', dot: '#DC2626' },
  { value: 'Sedang', label: 'Risiko Sedang',  color: '#D97706', dot: '#D97706' },
  { value: 'Rendah', label: 'Risiko Rendah',  color: '#16A34A', dot: '#16A34A' },
];

const STATUS_ITEMS = [
  { value: 'Open',       label: 'Open',       color: '#DC2626' },
  { value: 'Monitoring', label: 'Monitoring', color: '#D97706' },
  { value: 'Completed',  label: 'Completed',  color: '#16A34A' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Sidebar({
  collapsed, setCollapsed,
  domainFilter, setDomainFilter,
  riskFilter,   setRiskFilter,
  statusFilter, setStatusFilter,
  clearFilters,
  activeSection,
  exporting,
  onExport,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const activeCount = [domainFilter, riskFilter, statusFilter].filter(Boolean).length;

  const W = collapsed ? 72 : 260;

  return (
    <aside style={{
      width: W,
      minWidth: W,
      maxWidth: W,
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s, max-width 0.25s',
      overflow: 'hidden',
      zIndex: 200,
      boxShadow: '2px 0 20px rgba(0,0,0,0.18)',
      flexShrink: 0,
    }}>

      {/* ── Brand ── */}
      <div style={{ padding: collapsed ? '20px 0' : '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12, minHeight: 72 }}>
        <div style={{ width: collapsed ? 44 : 48, height: collapsed ? 44 : 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0, margin: collapsed ? '0 auto' : '0', boxShadow: '0 4px 12px rgba(226,28,43,0.4)', transition: 'width 0.25s, height 0.25s' }}>
          <img src={richeeseLogoSrc} alt="Richeese Factory" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9', margin: 0, whiteSpace: 'nowrap' }}>Richeese Factory</p>
            <p style={{ fontSize: 10, color: '#64748b', margin: 0, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>COBIT 2019 · 2026</p>
          </div>
        )}
      </div>

      {/* ── Nav Items ── */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Section label */}
        {!collapsed && (
          <p style={{ fontSize: 9, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px 8px', margin: 0 }}>Navigasi Dashboard</p>
        )}

        {NAV_ITEMS.map(({ id, label, sublabel, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: collapsed ? '12px 0' : '10px 12px',
                borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isActive ? 'linear-gradient(135deg,#E21C2B22,#E21C2B11)' : 'transparent',
                borderLeft: isActive ? '3px solid #E21C2B' : '3px solid transparent',
                color: isActive ? '#fca5a5' : '#94a3b8',
                width: '100%', textAlign: 'left',
                transition: 'all 0.15s',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={18} style={{ flexShrink: 0, color: isActive ? '#E21C2B' : '#64748b' }} />
              {!collapsed && (
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: isActive ? '#f1f5f9' : '#cbd5e1', whiteSpace: 'nowrap' }}>{label}</p>
                  <p style={{ fontSize: 10, margin: 0, color: '#475569', whiteSpace: 'nowrap', marginTop: 1 }}>{sublabel}</p>
                </div>
              )}
            </button>
          );
        })}

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 4px' }} />

        {/* ── Filter Quick-Access ── */}
        {!collapsed && (
          <p style={{ fontSize: 9, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px 8px', margin: 0 }}>Filter Cepat</p>
        )}

        {/* Filter toggle button */}
        <button
          onClick={() => { if (collapsed) { setCollapsed(false); setFilterOpen(true); } else setFilterOpen(v => !v); }}
          title={collapsed ? 'Filter' : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: collapsed ? '12px 0' : '10px 12px',
            borderRadius: 10, border: 'none', cursor: 'pointer',
            background: filterOpen && !collapsed ? 'rgba(255,255,255,0.06)' : 'transparent',
            color: '#94a3b8', width: '100%', textAlign: 'left',
            transition: 'all 0.15s',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = filterOpen && !collapsed ? 'rgba(255,255,255,0.06)' : 'transparent'}
        >
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Filter size={18} style={{ color: activeCount > 0 ? '#E21C2B' : '#64748b' }} />
            {activeCount > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: '50%', background: '#E21C2B', color: '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activeCount}</span>
            )}
          </div>
          {!collapsed && (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#cbd5e1' }}>Filter Temuan</p>
                <p style={{ fontSize: 10, margin: 0, color: '#475569' }}>{activeCount > 0 ? `${activeCount} aktif` : 'Belum difilter'}</p>
              </div>
              <ChevronRight size={14} style={{ color: '#475569', transform: filterOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
          )}
        </button>

        {/* Filter sub-panel */}
        {!collapsed && filterOpen && (
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, margin: '4px 0', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Domain Filter */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, margin: '0 0 6px' }}>Domain COBIT</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {DOMAIN_ITEMS.map(d => (
                  <button key={d.code} onClick={() => setDomainFilter(v => v === d.code ? '' : d.code)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 7, border: `1px solid ${domainFilter === d.code ? d.color : 'transparent'}`, background: domainFilter === d.code ? d.bg + '33' : 'transparent', cursor: 'pointer', width: '100%', transition: 'all 0.15s' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: domainFilter === d.code ? d.color : '#94a3b8' }}>{d.code}</span>
                    <span style={{ fontSize: 11, color: '#475569' }}>— {d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Filter */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px' }}>Tingkat Risiko</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {RISK_ITEMS.map(r => (
                  <button key={r.value} onClick={() => setRiskFilter(v => v === r.value ? '' : r.value)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 7, border: `1px solid ${riskFilter === r.value ? r.color : 'transparent'}`, background: riskFilter === r.value ? r.color + '22' : 'transparent', cursor: 'pointer', width: '100%', transition: 'all 0.15s' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: riskFilter === r.value ? r.color : '#94a3b8' }}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px' }}>Status Temuan</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {STATUS_ITEMS.map(s => (
                  <button key={s.value} onClick={() => setStatusFilter(v => v === s.value ? '' : s.value)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 7, border: `1px solid ${statusFilter === s.value ? s.color : 'transparent'}`, background: statusFilter === s.value ? s.color + '22' : 'transparent', cursor: 'pointer', width: '100%', transition: 'all 0.15s' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: statusFilter === s.value ? s.color : '#94a3b8' }}>{s.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {activeCount > 0 && (
              <button onClick={clearFilters}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px', borderRadius: 8, border: '1px solid rgba(226,28,43,0.4)', background: 'rgba(226,28,43,0.1)', color: '#fca5a5', cursor: 'pointer', fontSize: 12, fontWeight: 700, width: '100%' }}>
                <X size={13} /> Reset Semua Filter
              </button>
            )}
          </div>
        )}

        {/* ── Info link ── */}
        <button
          onClick={() => window.open('https://www.isaca.org/resources/cobit', '_blank')}
          title={collapsed ? 'COBIT 2019 Reference' : undefined}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: collapsed ? '12px 0' : '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: '#94a3b8', width: '100%', textAlign: 'left', transition: 'all 0.15s', justifyContent: collapsed ? 'center' : 'flex-start' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <BookOpen size={18} style={{ color: '#64748b', flexShrink: 0 }} />
          {!collapsed && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#cbd5e1' }}>Referensi COBIT</p>
              <p style={{ fontSize: 10, margin: 0, color: '#475569' }}>isaca.org/cobit</p>
            </div>
          )}
        </button>
      </nav>

      {/* ── Bottom Actions ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: collapsed ? '12px 8px' : '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Export PDF */}
        <button
          onClick={onExport}
          disabled={exporting}
          title={collapsed ? 'Ekspor PDF' : undefined}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 10, padding: collapsed ? '11px 0' : '11px 14px',
            borderRadius: 10, border: 'none', cursor: exporting ? 'not-allowed' : 'pointer',
            background: exporting ? '#1e293b' : 'linear-gradient(135deg,#E21C2B,#9f1239)',
            color: '#fff', width: '100%', fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
            boxShadow: exporting ? 'none' : '0 4px 14px rgba(226,28,43,0.35)',
            fontFamily: "'Inter',sans-serif",
          }}
        >
          {exporting
            ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
            : <Download size={16} style={{ flexShrink: 0 }} />}
          {!collapsed && (exporting ? 'Mengekspor...' : 'Ekspor PDF')}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(v => !v)}
          title={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '9px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
            background: 'transparent', color: '#64748b', cursor: 'pointer',
            width: '100%', fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
            fontFamily: "'Inter',sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94a3b8'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Ciutkan</span></>}
        </button>
      </div>
    </aside>
  );
}
