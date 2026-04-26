import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Target, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

const getColor = (level) => {
  if (level < 3) return '#DC2626';
  if (level < 4) return '#D97706';
  return '#16A34A';
};

function ThreatGauge() {
  return (
    <div style={{ position: 'relative', height: 110, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <PieChart width={180} height={110}>
        <Pie
          data={[{ v: 80 }, { v: 20 }]}
          dataKey="v"
          cx={90} cy={100}
          startAngle={180} endAngle={0}
          innerRadius={58} outerRadius={80}
          stroke="none"
          isAnimationActive
        >
          <Cell fill="#DC2626" />
          <Cell fill="#f1f5f9" />
        </Pie>
      </PieChart>
      <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
        <p style={{ fontSize: 20, fontWeight: 900, color: '#DC2626', margin: 0, lineHeight: 1 }}>HIGH</p>
      </div>
    </div>
  );
}

const overall = 2.8;
const overallColor = getColor(overall);

const kpis = [
  {
    label: 'Capability Level Keseluruhan',
    value: '2.8',
    sub: '/ 5',
    color: overallColor,
    icon: <CheckCircle2 size={20} />,
    note: 'Di bawah target — perlu perbaikan',
    noteColor: '#DC2626',
    bg: '#fef2f2',
    border: '#fecaca',
  },
  {
    label: 'Target Capability Level',
    value: '4.0',
    sub: '/ 5',
    color: '#1d4ed8',
    icon: <Target size={20} />,
    note: 'Target organisasi COBIT',
    noteColor: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  {
    label: 'Gap Capability Level',
    value: '-1.2',
    sub: 'pts',
    color: '#DC2626',
    icon: <TrendingDown size={20} />,
    note: 'Jarak menuju target',
    noteColor: '#DC2626',
    bg: '#fef2f2',
    border: '#fecaca',
  },
  {
    label: 'IT Control Compliance Level',
    value: '72%',
    sub: '',
    color: '#D97706',
    icon: <ShieldAlert size={20} />,
    note: 'Kepatuhan kontrol IT saat ini',
    noteColor: '#D97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
];

export default function KPISection() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
      {kpis.map((k, i) => (
        <div key={i} style={{
          background: '#fff',
          borderRadius: 16,
          border: `1px solid ${k.border}`,
          padding: '20px 22px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: k.color, borderRadius: '16px 16px 0 0' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', lineHeight: 1.4 }}>{k.label}</span>
            <span style={{ color: k.color, background: k.bg, borderRadius: 8, padding: '4px 6px', display: 'flex' }}>{k.icon}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 38, fontWeight: 900, color: k.color, lineHeight: 1 }}>{k.value}</span>
            {k.sub && <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>{k.sub}</span>}
          </div>
          <p style={{ fontSize: 11, color: k.noteColor, fontWeight: 600, margin: 0, opacity: 0.85 }}>{k.note}</p>
        </div>
      ))}

      {/* Threat Gauge Card */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #fecaca',
        padding: '16px 18px',
        boxShadow: '0 1px 6px rgba(226,28,43,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#DC2626', borderRadius: '16px 16px 0 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', marginBottom: 4 }}>
          <AlertTriangle size={14} color="#DC2626" />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Threat Exposure Level</span>
        </div>
        <ThreatGauge />
        <p style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', margin: '4px 0 0', textAlign: 'center' }}>Ancaman Siber Tinggi</p>
      </div>
    </section>
  );
}
