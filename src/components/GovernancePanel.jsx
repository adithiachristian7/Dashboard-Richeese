import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

const strategicData = [
  { name: 'Support', value: 3 },
  { name: 'Factory', value: 5 },
  { name: 'Turnaround', value: 4 },
  { name: 'Strategic', value: 5 },
];

const radarData = [
  { goal: 'EG01', label: 'Keselamatan', value: 4 },
  { goal: 'EG04', label: 'Risiko', value: 5 },
  { goal: 'EG08', label: 'Kepatuhan', value: 3 },
  { goal: 'EG12', label: 'Layanan', value: 5 },
  { goal: 'EG13', label: 'Data', value: 4 },
];

function Gauge() {
  return (
    <div style={{ position: 'relative', height: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <PieChart width={200} height={120}>
        <Pie
          data={[{ v: 80 }, { v: 20 }]}
          dataKey="v"
          cx={100} cy={110}
          startAngle={180} endAngle={0}
          innerRadius={65} outerRadius={90}
          stroke="none"
          isAnimationActive
        >
          <Cell fill="#DC2626" />
          <Cell fill="#f1f5f9" />
        </Pie>
      </PieChart>
      <div style={{ position: 'absolute', bottom: 0, textAlign: 'center' }}>
        <AlertTriangle size={20} color="#DC2626" style={{ margin: '0 auto 2px' }} />
        <p style={{ fontSize: 22, fontWeight: 900, color: '#DC2626', margin: 0, lineHeight: 1 }}>HIGH</p>
      </div>
    </div>
  );
}

export default function GovernancePanel() {
  return (
    <section style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px 32px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>Advanced Governance Panel – COBIT Design Factors</h3>
        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4, fontWeight: 500 }}>Indikator faktor desain tata kelola IT berdasarkan COBIT 2019</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'start' }}>

        {/* Strategic Role of IT */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'center', marginBottom: 16, marginTop: 0 }}>Strategic Role of IT</h4>
          <div style={{ height: 190 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strategicData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 10, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                  <LabelList dataKey="value" position="top" style={{ fontWeight: 800, fontSize: 12, fill: '#1e293b' }} />
                  {strategicData.map((e, i) => (
                    <Cell key={i} fill={e.value === 5 ? '#E21C2B' : '#fca5a5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 8 }}>Merah = Peran paling dominan (nilai 5)</p>
        </div>

        {/* Enterprise Goal Radar */}
        <div style={{ borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', padding: '0 24px' }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'center', marginBottom: 8, marginTop: 0 }}>Enterprise Goal Importance Level</h4>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="goal" tick={{ fontSize: 11, fill: '#475569', fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="Importance" dataKey="value" stroke="#E21C2B" strokeWidth={2.5} fill="#E21C2B" fillOpacity={0.18} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
            {radarData.map(d => (
              <span key={d.goal} style={{ fontSize: 10, color: '#475569', fontWeight: 600 }}>
                <span style={{ color: '#E21C2B' }}>{d.goal}</span>: {d.label} ({d.value}/5)
              </span>
            ))}
          </div>
        </div>

        {/* Threat Landscape Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'center', marginBottom: 16, marginTop: 0 }}>Threat Landscape Level</h4>
          <Gauge />
          <div style={{ marginTop: 16, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 18px', textAlign: 'center', width: '100%' }}>
            <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 700, margin: 0 }}>⚠ Eksposur ancaman siber sangat tinggi</p>
            <p style={{ fontSize: 11, color: '#ef4444', margin: '4px 0 0', fontWeight: 500 }}>Mitigasi segera diperlukan pada area DSS05 & MEA01</p>
          </div>
        </div>
      </div>
    </section>
  );
}
