import React, { useState } from 'react';
import { Search, Building2, Calculator, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';

const ToolsPage = ({ onOpenApply }) => {
  const [bank, setBank] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [branch, setBranch] = useState('');
  const [ifscResult, setIfscResult] = useState(null);

  const handleIfscSearch = (e) => {
    e.preventDefault();
    if (bank) {
      setIfscResult({
        bank: bank || 'State Bank of India',
        ifsc: 'SBIN0001234',
        branch: branch || 'Main Branch',
        micr: '400002015',
        address: '123 Commercial Avenue, Financial District',
        city: district || 'Mumbai',
        state: state || 'Maharashtra',
      });
    }
  };

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8fafc]">
      
      {/* 1. HERO TITLE */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#0050b5] text-xs font-bold uppercase tracking-wider">
          FINANCIAL TOOLS & CALCULATORS
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          IFSC Code Finder & Loan Calculators
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Search Bank IFSC codes, calculate personal & business loan EMIs, and check borrowing eligibility instantly online.
        </p>
      </section>

      {/* 2. IFSC CODE SEARCH CARD */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">IFSC Code Search Engine</h2>
              <p className="text-xs text-slate-500 font-medium">Find official NEFT / RTGS / IMPS IFSC codes for all Indian banks.</p>
            </div>
          </div>

          <form onSubmit={handleIfscSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Select Bank</label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
              >
                <option value="">-- Choose Bank --</option>
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Select State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
              >
                <option value="">-- Choose State --</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">District / City</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Branch Name</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. BKC Branch"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="btn-smooth-animate btn-brand-glow w-full py-3.5 rounded-xl bg-[#0050b5] hover:bg-[#003e8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" /> Search IFSC Code
              </button>
            </div>
          </form>

          {/* Search Result Display */}
          {ifscResult && (
            <div className="mt-6 bg-blue-50/80 border border-blue-200 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center border-b border-blue-200/60 pb-3">
                <span className="font-extrabold text-slate-900 text-base">{ifscResult.bank}</span>
                <span className="bg-[#0050b5] text-white px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
                  IFSC: {ifscResult.ifsc}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-medium text-slate-700">
                <p><strong className="text-slate-900">Branch:</strong> {ifscResult.branch}</p>
                <p><strong className="text-slate-900">MICR Code:</strong> {ifscResult.micr}</p>
                <p><strong className="text-slate-900">City:</strong> {ifscResult.city}</p>
                <p><strong className="text-slate-900">State:</strong> {ifscResult.state}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CREDIT SCORE GAUGE BANNER WITH EXACT REFERENCE IMAGE */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">CHECK YOUR</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0050b5]">FREE CREDIT SCORE GAUGE</h3>
            <p className="text-xs text-slate-600 font-medium">Check credit score report to unlock lower interest rates.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjTQiVR2cJvDzNVEdCpXvWu40SUrbS657hYVfQ7UeCMAOBm6HoEY_3fl-iEGZ_ecFzDn3A1iRR-Up05Khfv8x7W9l2QI2b27-41Cw3tGnd0BnDCjw178zMNNEo3BJuoSIynz00NjSYctTCqkVtkyyLdnpnr6MFUQUqakIViJOn0AuaDkiio1Qi5zZ0ZQjbClxf-O2csU4Ouhtcx_-lgHbxguAfKsaXl_zqVO0YagzmnXnb7Q9Me2O-VARgBSZvm8UkCds"
              alt="FinCrop Credit Score Gauge"
              className="h-28 sm:h-32 w-auto object-contain rounded-xl"
            />
            <button
              onClick={() => onOpenApply && onOpenApply('credit_score')}
              className="btn-smooth-animate btn-emerald-glow px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer"
            >
              Check Now
            </button>
          </div>
        </div>
      </section>

      {/* 4. EMI CALCULATOR COMPONENT */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <EMICalculator onApply={() => onOpenApply && onOpenApply('personal_loan')} />
      </section>

    </div>
  );
};

export default ToolsPage;
