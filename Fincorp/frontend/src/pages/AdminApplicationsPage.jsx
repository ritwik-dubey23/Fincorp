import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/applications', {
        params: {
          search,
          status: statusFilter,
          productType: productFilter,
          page,
          limit: 10,
        },
      });
      if (res.data.success) {
        setApplications(res.data.applications);
        setTotalPages(res.data.pages);
        setTotalRecords(res.data.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, statusFilter, productFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchApplications();
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">ADMINISTRATIVE MANAGEMENT</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Application & Lead Registry</h1>
        </div>
        <div className="text-xs font-bold text-slate-500">
          Showing <span className="text-slate-900">{totalRecords}</span> Total Applications
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-96">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Ref ID, Name, Mobile, PAN..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
            >
              <option value="all">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Documents Required">Documents Required</option>
              <option value="Processing">Processing</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Product:</span>
            <select
              value={productFilter}
              onChange={(e) => { setProductFilter(e.target.value); setPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
            >
              <option value="all">All Products</option>
              <option value="personal_loan">Personal Loan</option>
              <option value="business_loan">Business Loan</option>
              <option value="credit_score">Credit Score</option>
              <option value="credit_card">Credit Card</option>
            </select>
          </div>
        </div>

      </div>

      {/* Applications Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400">Loading Applications...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">PAN / Aadhaar</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Income & Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-mono font-bold text-blue-600">{app.applicationId}</td>
                    <td className="p-3 font-bold text-slate-900">{app.fullName}</td>
                    <td className="p-3">
                      <div>{app.mobile}</div>
                      <div className="text-[10px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="p-3 font-mono">
                      <div className="uppercase font-bold">{app.panNumber}</div>
                      <div className="text-[10px] text-slate-400">{app.aadhaarNumber || 'N/A'}</div>
                    </td>
                    <td className="p-3 font-bold text-blue-800 uppercase">{app.productType.replace('_', ' ')}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">₹{app.requestedAmount.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-400">Income: ₹{app.monthlyIncome.toLocaleString('en-IN')}/mo</div>
                    </td>
                    <td className="p-3">{getStatusBadge(app.status)}</td>
                    <td className="p-3 text-[11px] text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <Link
                        to={`/admin/applications/${app._id}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminApplicationsPage;
