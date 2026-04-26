import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const getColor = (l) => l < 3 ? '#DC2626' : l < 4 ? '#D97706' : '#16A34A';

const areaData = [
  { name: 'Kontrol Akses', level: 3.2 },
  { name: 'Inventaris', level: 2.5 },
  { name: 'Jaringan', level: 2.2 },
  { name: 'Pengujian Kontrol', level: 3.0 },
];

const domainData = [
  { domain: 'DSS05', level: 3.2, fullName: 'Security Services' },
  { domain: 'APO12', level: 2.5, fullName: 'Risk Management' },
  { domain: 'MEA01', level: 3.0, fullName: 'Performance Monitoring' },
];

const CustomTooltipDomain = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:'10px 14px',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}>
        <p style={{fontWeight:700,color:'#1e293b',marginBottom:4}}>{d.domain} – {d.fullName}</p>
        <p style={{color:getColor(d.level),fontWeight:800,fontSize:18}}>Level {d.level}</p>
      </div>
    );
  }
  return null;
};

export default function CapabilitySection({ domainFilter, setDomainFilter }) {
  return (
    <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      {/* Area Progress Bars */}
      <div style={{background:'#fff',borderRadius:16,border:'1px solid #e2e8f0',padding:'24px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{borderBottom:'1px solid #f1f5f9',paddingBottom:12,marginBottom:24}}>
          <h3 style={{fontSize:16,fontWeight:700,color:'#1e293b',margin:0}}>Capability Level per Area Proses</h3>
          <p style={{fontSize:12,color:'#94a3b8',marginTop:4,fontWeight:500}}>Scorecard kontrol per area operasional</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {areaData.map(a => {
            const c = getColor(a.level);
            const pct = (a.level / 5) * 100;
            return (
              <div key={a.name}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:14,fontWeight:600,color:'#334155'}}>{a.name}</span>
                  <span style={{fontSize:14,fontWeight:800,color:c}}>{a.level} <span style={{color:'#cbd5e1',fontWeight:500}}>/5</span></span>
                </div>
                <div style={{height:10,background:'#f1f5f9',borderRadius:99,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg, ${c}cc, ${c})`,borderRadius:99,transition:'width 0.7s ease'}}/>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
                  {[0,1,2,3,4,5].map(t => (
                    <span key={t} style={{fontSize:10,color:a.level >= t ? c : '#cbd5e1',fontWeight:600}}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{display:'flex',gap:16,marginTop:20,paddingTop:16,borderTop:'1px solid #f1f5f9'}}>
          {[['< 3','Perlu Perbaikan','#DC2626'],['3–3.9','Cukup','#D97706'],['≥ 4','Baik','#16A34A']].map(([r,l,c])=>(
            <div key={r} style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>
              <span style={{fontSize:11,color:'#64748b',fontWeight:600}}>{l} ({r})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Bar Chart */}
      <div style={{background:'#fff',borderRadius:16,border:'1px solid #e2e8f0',padding:'24px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{borderBottom:'1px solid #f1f5f9',paddingBottom:12,marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <h3 style={{fontSize:16,fontWeight:700,color:'#1e293b',margin:0}}>Capability Level per Domain COBIT</h3>
            <p style={{fontSize:12,color:'#94a3b8',marginTop:4,fontWeight:500}}>Klik bar untuk filter tabel temuan</p>
          </div>
          {domainFilter && (
            <button onClick={() => setDomainFilter('')} style={{fontSize:11,color:'#E21C2B',fontWeight:700,background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'4px 10px',cursor:'pointer'}}>
              ✕ {domainFilter}
            </button>
          )}
        </div>
        <div style={{height:240}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainData} layout="vertical" margin={{top:0,right:50,left:10,bottom:0}}
              onClick={d => { if(d?.activePayload?.length) setDomainFilter(prev => prev === d.activePayload[0].payload.domain ? '' : d.activePayload[0].payload.domain); }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9"/>
              <XAxis type="number" domain={[0,5]} ticks={[0,1,2,3,4,5]} tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
              <YAxis dataKey="domain" type="category" width={55} tick={{fontSize:13,fill:'#334155',fontWeight:700}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltipDomain/>} cursor={{fill:'#f8fafc'}}/>
              <Bar dataKey="level" radius={[0,6,6,0]} maxBarSize={40}>
                <LabelList dataKey="level" position="right" style={{fontWeight:800,fontSize:13,fill:'#334155'}}/>
                {domainData.map((e,i) => (
                  <Cell key={i} fill={getColor(e.level)}
                    style={{cursor:'pointer',opacity: domainFilter && domainFilter !== e.domain ? 0.25 : 1, transition:'opacity 0.2s'}}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
