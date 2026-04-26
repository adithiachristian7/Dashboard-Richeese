import { useState } from "react";
import logo from "./assets/richeese-factory-logo.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const findings = [
    {
      id: 1,
      process: "DSS05.04",
      observation:
        "Kontrol Akses Lemah: Beberapa pengguna berbagi kredensial administratif pada terminal POS.",
      risk: "TINGGI",
      badgeClass: "bg-red-50 text-red-700",
    },
    {
      id: 2,
      process: "APO12.01",
      observation:
        "Pelacakan Inventaris Manual: Kurangnya validasi sistem untuk tingkat stok penyimpanan dingin.",
      risk: "SEDANG",
      badgeClass: "bg-amber-50 text-amber-700",
    },
    {
      id: 3,
      process: "MEA01.03",
      observation:
        "Kurangnya Pemantauan Sistem: Tinjauan log tidak dilakukan secara rutin oleh manajemen.",
      risk: "TINGGI",
      badgeClass: "bg-red-50 text-red-700",
    },
  ];

  const filteredFindings = findings.filter((item) => {
    const query = searchTerm.toLowerCase();
    return (
      item.process.toLowerCase().includes(query) ||
      item.observation.toLowerCase().includes(query) ||
      item.risk.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <nav className="flex flex-col fixed left-0 top-0 h-full z-40 bg-slate-50 border-r border-slate-200 w-64">
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
            COBIT 2019
          </h1>
          <p className="text-[10px] font-bold text-primary tracking-widest mt-1">
            KERANGKA KERJA AUDIT
          </p>
        </div>
        <div className="flex-1 px-4 space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 bg-white text-[#EF1C24] font-bold border-l-4 border-[#EF1C24] transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-label-md text-label-md">
              Ringkasan Eksekutif
            </span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="analytics">
              analytics
            </span>
            <span className="font-label-md text-label-md">
              Kematangan Proses
            </span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="gpp_maybe">
              gpp_maybe
            </span>
            <span className="font-label-md text-label-md">
              Penilaian Risiko
            </span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="fact_check">
              fact_check
            </span>
            <span className="font-label-md text-label-md">
              Pengujian Kontrol
            </span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="description">
              description
            </span>
            <span className="font-label-md text-label-md">Laporan Audit</span>
          </a>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-100/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
              AP
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Profil Auditor</p>
              <p className="text-[10px] text-slate-500">Ketua Auditor SI</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span
              className="material-symbols-outlined text-slate-400 cursor-pointer"
              data-icon="menu"
            >
              menu
            </span>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <img
              src={logo}
              alt="Richeese Factory"
              className="h-10 w-auto rounded-md shadow-sm"
            />
            <div>
              <h2 className="font-headline-md text-headline-md font-bold tracking-tight text-slate-900">
                Dashboard Audit | Richeese Factory
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Dashboard Audit Sistem Informasi – Gerai Richeese Factory
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Periode Audit Berjalan
              </p>
              <p className="text-xs font-bold text-slate-900">
                Q3 2024 - Tahun Fiskal
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
              <span
                className="material-symbols-outlined text-slate-600"
                data-icon="notifications"
              >
                notifications
              </span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                  Laporan Akademik
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                  Rahasia
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-slate-900">
                Kerangka Kerja: COBIT | Cakupan: POS, Inventaris, Kontrol Akses,
                Jaringan
              </h3>
              <p className="text-slate-500 text-sm">
                Target Tingkat Kematangan: 4.0 (Terprediksi) | Metodologi:
                Panduan Desain ISACA COBIT 2019
              </p>
            </div>
            <button className="bg-primary text-white font-label-md text-label-md px-6 py-2.5 rounded hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="download"
              >
                download
              </span>
              EKSPOR LAPORAN AUDIT LENGKAP
            </button>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-lg">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Kematangan Keseluruhan
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900 font-data-numeric">
                  2.8
                </span>
                <span className="text-xs text-primary font-bold mb-1">
                  / 5.0
                </span>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full w-[56%] bg-primary rounded-full" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-lg">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Kontrol Akses
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900 font-data-numeric">
                  3.2
                </span>
                <span className="text-xs text-primary font-bold mb-1">
                  / 5.0
                </span>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full w-[64%] bg-primary rounded-full" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-lg">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Inventaris
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900 font-data-numeric">
                  2.5
                </span>
                <span className="text-xs text-primary font-bold mb-1">
                  / 5.0
                </span>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full w-[50%] bg-primary rounded-full" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-lg">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Jaringan
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900 font-data-numeric">
                  2.2
                </span>
                <span className="text-xs text-primary font-bold mb-1">
                  / 5.0
                </span>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full w-[44%] bg-primary rounded-full" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-lg">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pengujian Kontrol
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900 font-data-numeric">
                  3.0
                </span>
                <span className="text-xs text-primary font-bold mb-1">
                  / 5.0
                </span>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full w-[60%] bg-primary rounded-full" />
              </div>
            </div>
          </section>
          <section className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Temuan Audit Kritis
                </h3>
                <p className="text-sm text-slate-500">
                  Cari dan pantau temuan penting dalam proses audit.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Cari temuan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-72 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <span className="inline-flex items-center rounded-lg bg-primary/10 text-primary px-3 py-2 text-sm font-semibold">
                  IN
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead className="text-xs uppercase text-slate-500">
                  <tr>
                    <th className="pb-3">Proses/Sistem</th>
                    <th className="pb-3">Observasi</th>
                    <th className="pb-3">Tingkat Risiko</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFindings.map((item) => (
                    <tr key={item.id} className="bg-slate-50 rounded-xl">
                      <td className="py-4 pr-4 font-semibold text-slate-900">
                        {item.process}
                      </td>
                      <td className="py-4 pr-4 text-slate-600">
                        {item.observation}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${item.badgeClass}`}
                        >
                          {item.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredFindings.length === 0 && (
                <div className="py-6 text-center text-slate-500">
                  Tidak ada temuan yang cocok.
                </div>
              )}
            </div>
          </section>{" "}
        </div>
      </main>
    </>
  );
}

export default App;
