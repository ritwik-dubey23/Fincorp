import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, AlertCircle, Upload, FileText, ShieldCheck, Download } from 'lucide-react';
import API from '../services/api';

const TrackStatusPage = () => {
  const [query, setQuery] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Upload document state
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setApplications([]);
    setSelectedApp(null);
    try {
      const res = await API.get(`/applications/track/${query.trim()}`);
      if (res.data.success) {
        setApplications(res.data.applications);
        if (res.data.applications.length > 0) {
          setSelectedApp(res.data.applications[0]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'No application found with this Mobile or Application ID');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDoc = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedApp) return;

    const formData = new FormData();
    formData.append('applicationId', selectedApp.applicationId);
    formData.append('docName', docName || selectedFile.name);
    formData.append('file', selectedFile);

    setUploading(true);
    setUploadMsg('');
    try {
      const res = await API.post('/applications/upload-doc', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setUploadMsg('✓ Document uploaded successfully!');
        setSelectedFile(null);
        setDocName('');
        // Refresh application details
        const refresh = await API.get(`/applications/track/${selectedApp.applicationId}`);
        if (refresh.data.success) {
          setSelectedApp(refresh.data.applications[0]);
        }
      }
    } catch (err) {
      setUploadMsg('❌ Failed to upload document. Only PDF, JPG, and PNG are allowed.');
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">Approved</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-extrabold text-xs">Rejected</span>;
      case 'Documents Required':
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">Documents Required</span>;
      case 'Under Review':
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">Under Review</span>;
      case 'Processing':
        return <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs">Processing</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200">
          APPLICATION PORTAL
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Track Your Application Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter your 10-digit mobile number or Application Reference ID (e.g. FIN-2026-XXXXX) to view live updates and submit requested documents.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 pt-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Mobile Number or Application ID"
            required
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center gap-1.5 shrink-0"
          >
            {loading ? 'Searching...' : <><Search className="w-4 h-4" /> Track</>}
          </button>
        </form>

        {error && <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl">⚠️ {error}</div>}
      </div>

      {/* Results View */}
      {selectedApp && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Main Info Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Application Ref</span>
                <h3 className="text-xl font-mono font-black text-blue-600">{selectedApp.applicationId}</h3>
              </div>
              <div>{getStatusBadge(selectedApp.status)}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Customer Name</span>
                <span className="font-bold text-slate-800">{selectedApp.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Mobile</span>
                <span className="font-bold text-slate-800">{selectedApp.mobile}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Email</span>
                <span className="font-bold text-slate-800 truncate block">{selectedApp.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Product Type</span>
                <span className="font-bold text-blue-700 uppercase">{selectedApp.productType.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Requested Amount</span>
                <span className="font-bold text-slate-900">₹{selectedApp.requestedAmount.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Application Date</span>
                <span className="font-bold text-slate-800">{new Date(selectedApp.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Status History Timeline */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" /> Application Status Timeline
              </h4>
              <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                {selectedApp.statusHistory?.map((item, idx) => (
                  <div key={idx} className="relative pl-4 space-y-0.5">
                    <div className="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.status}</span>
                      <span className="text-[10px] text-slate-400">{new Date(item.updatedAt).toLocaleString()}</span>
                    </div>
                    {item.remark && <p className="text-xs text-slate-500 italic">"{item.remark}"</p>}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Document Upload Portal */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" /> Document Submission Portal
            </h3>

            {/* Requested Docs Alert */}
            {selectedApp.requestedDocuments && selectedApp.requestedDocuments.length > 0 ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Admin Document Request:
                </span>
                <ul className="space-y-1 text-xs text-amber-800 font-medium">
                  {selectedApp.requestedDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span>📄 <strong>{doc.name}</strong> - {doc.description || 'Pending Upload'}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${doc.status === 'Uploaded' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}`}>
                        {doc.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No pending document requests at this moment.</p>
            )}

            {/* Upload Form */}
            <form onSubmit={handleUploadDoc} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Document Name / Type</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Salary Slip / Bank Statement"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select File (PDF, JPG, PNG)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  required
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {uploadMsg && <div className="text-xs font-bold text-slate-800">{uploadMsg}</div>}

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
              >
                {uploading ? 'Uploading Document...' : 'Upload Document Now'}
              </button>
            </form>

            {/* Uploaded Documents List */}
            {selectedApp.uploadedDocuments && selectedApp.uploadedDocuments.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase">Uploaded Files:</h4>
                <div className="space-y-2">
                  {selectedApp.uploadedDocuments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-bold text-slate-800 truncate">{file.docName}</span>
                      </div>
                      <a
                        href={file.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-bold hover:underline flex items-center gap-1 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" /> View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default TrackStatusPage;
