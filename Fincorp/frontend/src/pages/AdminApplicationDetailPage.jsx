import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { ArrowLeft, Clock, FileText, CheckCircle2, AlertCircle, Send, Download, ShieldCheck } from 'lucide-react';

const AdminApplicationDetailPage = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Status update state
  const [newStatus, setNewStatus] = useState('');
  const [statusRemark, setStatusRemark] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Request document state
  const [docName, setDocName] = useState('');
  const [docDesc, setDocDesc] = useState('');
  const [docRequesting, setDocRequesting] = useState(false);

  // Admin remark state
  const [adminRemarkText, setAdminRemarkText] = useState('');
  const [remarkSubmitting, setRemarkSubmitting] = useState(false);

  const fetchAppDetail = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/admin/applications/${id}`);
      if (res.data.success) {
        setApp(res.data.application);
        setNewStatus(res.data.application.status);
      }
    } catch (err) {
      setError('Failed to fetch application detail.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppDetail();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setStatusUpdating(true);
    try {
      const res = await API.put(`/admin/applications/${id}/status`, {
        status: newStatus,
        remark: statusRemark,
      });
      if (res.data.success) {
        setApp(res.data.application);
        setStatusRemark('');
      }
    } catch (err) {
      alert('Status update failed');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleRequestDoc = async (e) => {
    e.preventDefault();
    if (!docName.trim()) return;
    setDocRequesting(true);
    try {
      const res = await API.post(`/admin/applications/${id}/request-doc`, {
        docName,
        description: docDesc,
      });
      if (res.data.success) {
        setApp(res.data.application);
        setDocName('');
        setDocDesc('');
      }
    } catch (err) {
      alert('Document request failed');
    } finally {
      setDocRequesting(false);
    }
  };

  const handleAddRemark = async (e) => {
    e.preventDefault();
    if (!adminRemarkText.trim()) return;
    setRemarkSubmitting(true);
    try {
      const res = await API.post(`/admin/applications/${id}/remark`, {
        remark: adminRemarkText,
      });
      if (res.data.success) {
        setApp(res.data.application);
        setAdminRemarkText('');
      }
    } catch (err) {
      alert('Failed to add remark');
    } finally {
      setRemarkSubmitting(false);
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center font-bold text-xs text-slate-500">Loading Detail...</div>;
  }

  if (!app) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center font-bold text-xs text-red-600">Application not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link to="/admin/applications" className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Application Registry
        </Link>
        <span className="text-xs font-mono font-bold text-blue-600">ID: {app.applicationId}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Customer & Application Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Summary Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Applicant Full Name</span>
                <h2 className="text-2xl font-black text-slate-900">{app.fullName}</h2>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Current Status</span>
                <div className="mt-0.5">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-black text-xs uppercase">
                    {app.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Field Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Mobile Number</span>
                <span className="font-bold text-slate-900 text-sm">{app.mobile}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Email Address</span>
                <span className="font-bold text-slate-900 text-sm">{app.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Date of Birth</span>
                <span className="font-bold text-slate-900 text-sm">{app.dob || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">PAN Number</span>
                <span className="font-mono font-bold text-blue-600 text-sm uppercase">{app.panNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Aadhaar Number</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{app.aadhaarNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Employment Type</span>
                <span className="font-bold text-slate-900 text-sm uppercase">{app.employmentType}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Monthly Income</span>
                <span className="font-bold text-slate-900 text-sm">₹{app.monthlyIncome.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Requested Loan Amount</span>
                <span className="font-bold text-blue-700 text-base">₹{app.requestedAmount.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Product Selected</span>
                <span className="font-bold text-slate-900 text-sm uppercase">{app.productType.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Location: </span>
              <strong className="text-slate-800">{app.address || 'N/A'}, {app.city} {app.state} {app.pincode}</strong>
            </div>
          </div>

          {/* Uploaded Documents Viewer */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Uploaded Customer Documents ({app.uploadedDocuments?.length || 0})
            </h3>

            {app.uploadedDocuments && app.uploadedDocuments.length > 0 ? (
              <div className="space-y-3">
                {app.uploadedDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{doc.docName}</span>
                      <span className="text-[10px] text-slate-400">Uploaded: {new Date(doc.uploadedAt).toLocaleString()}</span>
                    </div>
                    <a
                      href={doc.filePath}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download / View
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No documents uploaded by customer yet.</p>
            )}
          </div>

          {/* Status History */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" /> Application Status History
            </h3>
            <div className="space-y-3 border-l-2 border-slate-200 pl-4 ml-2">
              {app.statusHistory?.map((h, i) => (
                <div key={i} className="relative space-y-0.5">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{h.status}</span>
                    <span className="text-[10px] text-slate-400">{new Date(h.updatedAt).toLocaleString()}</span>
                  </div>
                  {h.remark && <p className="text-xs text-slate-500 italic">"{h.remark}"</p>}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Admin Action Panels */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Update Status Panel */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Update Application Status</h3>
            
            <form onSubmit={handleStatusUpdate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Documents Required">Documents Required</option>
                  <option value="Processing">Processing</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Remark / Reason</label>
                <textarea
                  value={statusRemark}
                  onChange={(e) => setStatusRemark(e.target.value)}
                  placeholder="e.g. Approved based on PAN credit verification."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={statusUpdating}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                {statusUpdating ? 'Updating...' : 'Save & Notify Customer'}
              </button>
            </form>
          </div>

          {/* Request Document Panel */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Request Document from User</h3>
            
            <form onSubmit={handleRequestDoc} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Document Title *</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Latest 3-Month Salary Slip"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Instructions / Description</label>
                <input
                  type="text"
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                  placeholder="PDF preferred"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={docRequesting}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                {docRequesting ? 'Sending Request...' : 'Request Document Now'}
              </button>
            </form>
          </div>

          {/* Admin Remarks History */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Internal Admin Remarks</h3>

            <form onSubmit={handleAddRemark} className="space-y-2">
              <input
                type="text"
                value={adminRemarkText}
                onChange={(e) => setAdminRemarkText(e.target.value)}
                placeholder="Add internal note..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
              <button
                type="submit"
                disabled={remarkSubmitting}
                className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase"
              >
                Add Remark
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {app.adminRemarks?.map((r, i) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-800">{r.remark}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{r.createdBy} • {new Date(r.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminApplicationDetailPage;
