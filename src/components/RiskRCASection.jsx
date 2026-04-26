import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

const riskData = [
  { name: 'High Risk', label: 'Tinggi', value: 2, color: '#DC2626' },
  { name: 'Medium Risk', label: 'Sedang', value: 1, color: '#D97706' },
  { name: 'Low Risk', label: 'Rendah', value: 0, color: '#16A34A' },
];

const rcaData = [
  { category: 'SDM', count: 1 },
  { category: 'Integritas Data', count: 1 },
  { category: 'Infrastruktur', count: 1 },
  { category: 'Backup Data', count: 1 },
];

const RiskTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:'10px 14px',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}>
        <p style={{fontWeight:700,color:'#1e293b'}}>{d.name}</p>
        <p style={{color:d.color,fontWeight:800,fontSize:18}}>{d.value} Temuan</p>
      </div>
    );
  }
  return null;
};

export default function RiskRCASection({ riskFilter, setRiskFilter, rootCauseFilter, setRootCauseFilter }) {
  const filteredRisk = riskData.filter(r => r.value > 0);

  return (
    <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      {/* Donut Risk Chart */}
      <div style={{background:'#fff',borderRadius:16,border:'1px solid #e2e8f0',padding:'24px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{borderBottom:'1px solid #f1f5f9',paddingBottom:12,marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <h3 style={{fontSize:16,fontWeight:700,color:'#1e293b',margin:0}}>Distribusi Tingkat Risiko Audit</h3>
            <p style={{fontSize:12,color:'#94a3b8',marginTop:4,fontWeight:500}}>Klik chart / label untuk filter</p>
          </div>
          {riskFilter && (
            <button onClick={() => setRiskFilter('')} style={{fontSize:11,color:'#E21C2B',fontWeight:700,background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'4px 10px',cursor:'pointer'}}>✕ Reset</button>
          )}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <div style={{width:200,height:200,flexShrink:0}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={d => { if(d?.activePayload?.[0]) { const l = d.activePayload[0].payload.label; setRiskFilter(prev => prev === l ? '' : l); }}}>
                <Pie data={filteredRisk.length ? filteredRisk : [{name:'No Data',value:1,color:'#e2e8f0'}]}
                  cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={filteredRisk.length > 1 ? 4 : 0} dataKey="value" stroke="none">
                  {(filteredRisk.length ? filteredRisk : [{color:'#e2e8f0'}]).map((e,i) => (
                    <Cell key={i} fill={e.color} style={{cursor:'pointer',opacity: riskFilter && riskFilter !== e.label ? 0.25 : 1, transition:'opacity 0.2s'}}/>
                  ))}
                </Pie>
                <Tooltip content={<RiskTooltip/>}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:10}}>
            {riskData.map(r => (
              <div key={r.name} onClick={() => setRiskFilter(prev => prev === r.label ? '' : r.label)}
                style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderRadius:10,cursor:'pointer',
                  background: riskFilter === r.label ? '#f8fafc' : 'transparent',
                  border: riskFilter === r.label ? '1px solid #e2e8f0' : '1px solid transparent',
                  transition:'all 0.15s'}}>
                <span style={{width:12,height:12,borderRadius:'50%',background:r.color,flexShrink:0,boxShadow:`0 0 0 3px ${r.color}22`}}/>
                <span style={{flex:1,fontSize:13,fontWeight:600,color:'#334155'}}>{r.name}</span>
                <span style={{fontSize:22,fontWeight:900,color:r.value > 0 ? r.color : '#cbd5e1'}}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Root Cause Bar Chart */}
      <div style={{background:'#fff',borderRadius:16,border:'1px solid #e2e8f0',padding:'24px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{borderBottom:'1px solid #f1f5f9',paddingBottom:12,marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <h3 style={{fontSize:16,fontWeight:700,color:'#1e293b',margin:0}}>Kategori Akar Penyebab Temuan</h3>
            <p style={{fontSize:12,color:'#94a3b8',marginTop:4,fontWeight:500}}>Klik bar untuk filter tabel temuan</p>
          </div>
          {rootCauseFilter && (
            <button onClick={() => setRootCauseFilter('')} style={{fontSize:11,color:'#E21C2B',fontWeight:700,background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'4px 10px',cursor:'pointer'}}>✕ {rootCauseFilter}</button>
          )}
        </div>
        <div style={{height:220}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rcaData} margin={{top:20,right:10,left:-20,bottom:0}}
              onClick={d => { if(d?.activePayload?.length) setRootCauseFilter(prev => prev === d.activePayload[0].payload.category ? '' : d.activePayload[0].payload.category); }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
              <XAxis dataKey="category" tick={{fontSize:11,fill:'#64748b'}} axisLine={false} tickLine={false}/>
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill:'#94a3b8',fontSize:11}} domain={[0,3]}/>
              <Tooltip cursor={{fill:'#f8fafc'}} contentStyle={{borderRadius:10,border:'1px solid #e2e8f0',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}/>
              <Bar dataKey="count" radius={[6,6,0,0]} maxBarSize={48}>
                <LabelList dataKey="count" position="top" style={{fontWeight:800,fontSize:13,fill:'#334155'}}/>
                {rcaData.map((e,i) => (
                  <Cell key={i} fill={rootCauseFilter === e.category ? '#E21C2B' : '#fca5a5'}
                    style={{cursor:'pointer',opacity: rootCauseFilter && rootCauseFilter !== e.category ? 0.3 : 1, transition:'opacity 0.2s'}}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
