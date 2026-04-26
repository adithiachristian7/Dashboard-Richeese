import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { RefreshCw } from 'lucide-react';

const insights = [
  'Ketergantungan tinggi pada listrik tanpa UPS — risiko downtime sistem POS tidak terkendali.',
  'Backup data masih manual menggunakan flashdisk — risiko kehilangan data transaksi harian.',
  'Monitoring log sistem belum dilakukan rutin oleh manajemen — audit trail tidak memadai.',
];

export default function BottomSection({
  domainFilter, setDomainFilter,
  riskFilter, setRiskFilter,
  statusFilter, setStatusFilter,
  clearFilters,
  filteredFindings
}) {
  const getRiskStyle = (risk) => {
    if (risk === 'Tinggi') return { background:'#fef2f2', color:'#DC2626', border:'1px solid #fecaca' };
    if (risk === 'Sedang') return { background:'#fffbeb', color:'#D97706', border:'1px solid #fde68a' };
    return { background:'#f0fdf4', color:'#16A34A', border:'1px solid #bbf7d0' };
  };
  const getStatusStyle = (status) => {
    if (status === 'Open') return { background:'#fef2f2', color:'#DC2626', border:'1px solid #fecaca' };
    if (status === 'Monitoring') return { background:'#fffbeb', color:'#D97706', border:'1px solid #fde68a' };
    return { background:'#f0fdf4', color:'#16A34A', border:'1px solid #bbf7d0' };
  };
  const activeFiltersCount = [domainFilter, riskFilter, statusFilter].filter(Boolean).length;

  return (
    <section style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:20,alignItems:'start'}}>
      {/* Left: Insights + Filters */}
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {/* Insight Panel */}
        <div style={{background:'linear-gradient(135deg,#fffbeb,#fef3c7)',borderRadius:16,border:'1px solid #fde68a',padding:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
            <AlertTriangle size={18} color="#D97706"/>
            <h3 style={{fontSize:14,fontWeight:800,color:'#92400e',margin:0}}>Insight Audit Utama</h3>
          </div>
          <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:10}}>
            {insights.map((t,i) => (
              <li key={i} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                <ChevronRight size={14} color="#D97706" style={{flexShrink:0,marginTop:2}}/>
                <span style={{fontSize:12,color:'#78350f',fontWeight:500,lineHeight:1.5}}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter Panel */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #e2e8f0',padding:'20px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3 style={{fontSize:14,fontWeight:700,color:'#1e293b',margin:0}}>
              Filter Interaktif
              {activeFiltersCount > 0 && (
                <span style={{marginLeft:8,background:'#E21C2B',color:'#fff',borderRadius:99,fontSize:11,fontWeight:700,padding:'2px 8px'}}>{activeFiltersCount}</span>
              )}
            </h3>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} style={{display:'flex',alignItems:'center',gap:4,fontSize:11,fontWeight:700,color:'#E21C2B',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'4px 10px',cursor:'pointer'}}>
                <RefreshCw size={12}/> Reset
              </button>
            )}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              { label:'Domain COBIT', val:domainFilter, set:setDomainFilter, opts:[['','Semua Domain'],['DSS05','DSS05 – Security Services'],['APO12','APO12 – Risk Management'],['MEA01','MEA01 – Performance Monitoring']] },
              { label:'Tingkat Risiko', val:riskFilter, set:setRiskFilter, opts:[['','Semua Risiko'],['Tinggi','Tinggi'],['Sedang','Sedang'],['Rendah','Rendah']] },
              { label:'Status Temuan', val:statusFilter, set:setStatusFilter, opts:[['','Semua Status'],['Open','Open'],['Monitoring','Monitoring'],['Completed','Completed']] },
            ].map(f => (
              <div key={f.label}>
                <label style={{display:'block',fontSize:10,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:6}}>{f.label}</label>
                <select value={f.val} onChange={e => f.set(e.target.value)}
                  style={{width:'100%',fontSize:13,border:'1px solid #e2e8f0',borderRadius:8,padding:'8px 12px',color:'#334155',background:'#f8fafc',outline:'none',fontFamily:'Inter,sans-serif',cursor:'pointer',
                    boxShadow: f.val ? 'inset 0 0 0 2px #E21C2B33' : 'none'}}>
                  {f.opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Audit Findings Table */}
      <div style={{background:'#fff',borderRadius:16,border:'1px solid #e2e8f0',overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{padding:'20px 24px',borderBottom:'1px solid #f1f5f9',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#fff'}}>
          <div>
            <h3 style={{fontSize:16,fontWeight:700,color:'#1e293b',margin:0}}>Tabel Temuan Audit Kritis</h3>
            <p style={{fontSize:12,color:'#94a3b8',marginTop:4,fontWeight:500}}>Observasi, risiko, dan rekomendasi perbaikan tata kelola TI</p>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.07em',background:'#f1f5f9',color:'#475569',borderRadius:8,padding:'6px 12px'}}>
              {filteredFindings.length} Temuan
            </span>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:640}}>
            <thead>
              <tr style={{background:'#f8fafc',borderBottom:'1px solid #e2e8f0'}}>
                {['Domain / Kode','Observasi','Risiko','Rekomendasi','Status'].map(h => (
                  <th key={h} style={{padding:'12px 20px',textAlign:'left',fontSize:11,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.07em',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredFindings.length > 0 ? filteredFindings.map((f,i) => (
                <tr key={i} style={{borderBottom:'1px solid #f1f5f9',transition:'background 0.15s'}}
                  onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background='#fff'}>
                  <td style={{padding:'16px 20px',verticalAlign:'top'}}>
                    <div style={{fontWeight:800,color:'#1e293b',fontSize:14}}>{f.domain}</div>
                    <div style={{fontSize:11,color:'#94a3b8',fontWeight:600,marginTop:4,background:'#f1f5f9',borderRadius:6,padding:'2px 8px',display:'inline-block'}}>{f.code}</div>
                  </td>
                  <td style={{padding:'16px 20px',verticalAlign:'top',fontSize:13,color:'#475569',lineHeight:1.5,maxWidth:220}}>{f.observation}</td>
                  <td style={{padding:'16px 20px',verticalAlign:'top'}}>
                    <span style={{...getRiskStyle(f.risk),borderRadius:8,fontSize:11,fontWeight:700,padding:'4px 10px',display:'inline-block',whiteSpace:'nowrap'}}>{f.risk}</span>
                  </td>
                  <td style={{padding:'16px 20px',verticalAlign:'top',fontSize:13,color:'#475569',lineHeight:1.5,maxWidth:260}}>{f.recommendation}</td>
                  <td style={{padding:'16px 20px',verticalAlign:'top'}}>
                    <span style={{...getStatusStyle(f.status),borderRadius:8,fontSize:11,fontWeight:700,padding:'4px 10px',display:'inline-block',whiteSpace:'nowrap'}}>{f.status}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{padding:'48px 24px',textAlign:'center'}}>
                    <AlertTriangle size={32} color="#cbd5e1" style={{margin:'0 auto 12px'}}/>
                    <p style={{fontSize:14,color:'#94a3b8',fontWeight:600,margin:0}}>Tidak ada data yang sesuai dengan filter.</p>
                    <button onClick={clearFilters} style={{marginTop:8,fontSize:13,color:'#E21C2B',fontWeight:700,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Reset Filter</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
