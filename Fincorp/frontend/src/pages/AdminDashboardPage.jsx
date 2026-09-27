import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Users, FileText, Clock, AlertCircle, CheckCircle2, XCircle, ArrowRight, RefreshCw, Filter, Search } from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await API.get('/admin/stats');
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      const appsRes = await API.get('/admin/applications?limit=8');
      if (appsRes.data.success) {
        setRecentApps(appsRes.data.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">Approved</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-extrabold text-[11px]">Rejected</span>;
      case 'Documents Required':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[11px]">Docs Needed</span>;
      case 'Under Review':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[11px]">Under Review</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[11px]">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading Admin Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">ADMIN CONTROL PANEL</span>
          <h1 className="text-3xl font-black text-slate-900">Lead & Application Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
          <Link
            to="/admin/applications"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            View All Applications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <p className="text-3xl font-black text-slate-900 font-mono">{stats.totalLeads}</p>
          </div>

          <div className="bg-white border border-blue-200 p-5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">New Submitted</span>
            <p className="text-3xl font-black text-blue-700 font-mono">{stats.newLeads}</p>
          </div>

          <div className="bg-white border border-indigo-200 p-5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Under Review</span>
            <p className="text-3xl font-black text-indigo-700 font-mono">{stats.underReview}</p>
          </div>

          <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Docs Required</span>
            <p className="text-3xl font-black text-amber-600 font-mono">{stats.docsRequired}</p>
          </div>

          <div className="bg-white border border-emerald-200 p-5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Approved</span>
            <p className="text-3xl font-black text-emerald-600 font-mono">{stats.approved}</p>
          </div>

          <div className="bg-white border border-red-200 p-5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Rejected</span>
            <p className="text-3xl font-black text-red-600 font-mono">{stats.rejected}</p>
          </div>

        </div>
      )}

      {/* Recent Applications Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-black text-slate-900">Recent Customer Submissions</h3>
          <Link to="/admin/applications" className="text-xs font-bold text-blue-600 hover:underline">
            Manage All ({stats?.totalLeads || 0}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">PAN</th>
                <th className="p-3">Product</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApps.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 font-mono font-bold text-blue-600">{app.applicationId}</td>
                  <td className="p-3 font-bold text-slate-900">{app.fullName}</td>
                  <td className="p-3">{app.mobile}</td>
                  <td className="p-3 font-mono uppercase">{app.panNumber}</td>
                  <td className="p-3 font-semibold text-blue-800 uppercase">{app.productType.replace('_', ' ')}</td>
                  <td className="p-3 font-bold">₹{app.requestedAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3">{getStatusBadge(app.status)}</td>
                  <td className="p-3">
                    <Link
                      to={`/admin/applications/${app._id}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-[11px] transition inline-block"
                    >
                      Inspect Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardPage;
