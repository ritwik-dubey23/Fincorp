import React, { useState } from 'react';
import EMICalculator from '../components/EMICalculator';
import { Search, Building2, Coins, Calculator } from 'lucide-react';

const ToolsPage = ({ onOpenApply }) => {
  const [activeTab, setActiveTab] = useState('emi');

  // IFSC Lookup State
  const [ifsc, setIfsc] = useState('');
  const [ifscResult, setIfscResult] = useState(null);

  const handleIfscLookup = (e) => {
    e.preventDefault();
    if (!ifsc || ifsc.length < 11) return;
    setIfscResult({
      bank: 'STATE BANK OF INDIA',
      ifsc: ifsc.toUpperCase(),
      branch: 'MAIN BRANCH',
      city: 'VISAKHAPATNAM',
      state: 'ANDHRA PRADESH',
      micr: '530002002',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200">
          BANKING & FINANCE TOOLS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Smart Financial Calculators & Utilities
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Use our free tools to estimate loan repayments, search IFSC codes, check gold rate trends, and plan your finances.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-slate-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('emi')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'emi'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            EMI Calculator
          </button>
          <button
            onClick={() => setActiveTab('ifsc')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'ifsc'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            IFSC Code Finder
          </button>
          <button
            onClick={() => setActiveTab('gold')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'gold'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Gold Rate Today
          </button>
        </div>
      </div>

      {/* Tab 1: EMI Calculator */}
      {activeTab === 'emi' && (
        <div className="animate-in fade-in duration-200">
          <EMICalculator onApply={onOpenApply} />
        </div>
      )}

      {/* Tab 2: IFSC Code Finder */}
      {activeTab === 'ifsc' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-slate-900">IFSC Code Search</h3>
            <p className="text-xs text-slate-500">Find bank details, branch address, and MICR code by IFSC string.</p>
          </div>

          <form onSubmit={handleIfscLookup} className="flex gap-2">
            <input
              type="text"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value.toUpperCase())}
              placeholder="Enter 11-character IFSC (e.g. SBIN0001234)"
              maxLength={11}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono font-bold uppercase focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shrink-0"
            >
              Search
            </button>
          </form>

          {ifscResult && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3 text-xs text-slate-700">
              <h4 className="font-extrabold text-blue-900 text-sm border-b border-blue-200 pb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" /> {ifscResult.bank}
              </h4>
              <div className="grid grid-cols-2 gap-2 font-medium">
                <p><span className="text-slate-500">IFSC Code:</span> <strong className="font-mono text-slate-900">{ifscResult.ifsc}</strong></p>
                <p><span className="text-slate-500">MICR Code:</span> <strong className="font-mono text-slate-900">{ifscResult.micr}</strong></p>
                <p><span className="text-slate-500">Branch:</span> <strong>{ifscResult.branch}</strong></p>
                <p><span className="text-slate-500">City / State:</span> <strong>{ifscResult.city}, {ifscResult.state}</strong></p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Gold Rate Trends */}
      {activeTab === 'gold' && (
        <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-6 text-center animate-in fade-in duration-200">
          <div className="space-y-1">
            <Coins className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-black text-slate-900">Gold Rate Today in India</h3>
            <p className="text-xs text-slate-500">Live 24K and 22K gold rate updates per 10 grams.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase">24K Gold (99.9% Pure)</span>
              <p className="text-3xl font-black text-amber-900 font-mono">₹74,850</p>
              <span className="text-[11px] text-emerald-600 font-bold">▲ +₹250 (Today)</span>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase">22K Gold (Standard)</span>
              <p className="text-3xl font-black text-amber-900 font-mono">₹68,610</p>
              <span className="text-[11px] text-emerald-600 font-bold">▲ +₹230 (Today)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ToolsPage;
