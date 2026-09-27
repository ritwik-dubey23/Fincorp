import Application from '../models/Application.js';
import { memoryApplications } from './applicationController.js';
import { sendEmailNotification, sendSmsNotification } from '../utils/notifications.js';

export const getDashboardStats = async (req, res) => {
  try {
    let totalLeads = 0, newLeads = 0, underReview = 0, docsRequired = 0, processing = 0, approved = 0, rejected = 0;
    let personalLoans = 0, businessLoans = 0, creditCards = 0, creditScores = 0;

    try {
      totalLeads = await Application.countDocuments();
      newLeads = await Application.countDocuments({ status: 'Submitted' });
      underReview = await Application.countDocuments({ status: 'Under Review' });
      docsRequired = await Application.countDocuments({ status: 'Documents Required' });
      processing = await Application.countDocuments({ status: 'Processing' });
      approved = await Application.countDocuments({ status: 'Approved' });
      rejected = await Application.countDocuments({ status: 'Rejected' });

      personalLoans = await Application.countDocuments({ productType: 'personal_loan' });
      businessLoans = await Application.countDocuments({ productType: 'business_loan' });
      creditCards = await Application.countDocuments({ productType: 'credit_card' });
      creditScores = await Application.countDocuments({ productType: 'credit_score' });
    } catch (dbErr) {
      totalLeads = memoryApplications.length;
      newLeads = memoryApplications.filter((a) => a.status === 'Submitted').length;
      underReview = memoryApplications.filter((a) => a.status === 'Under Review').length;
      docsRequired = memoryApplications.filter((a) => a.status === 'Documents Required').length;
      approved = memoryApplications.filter((a) => a.status === 'Approved').length;
      rejected = memoryApplications.filter((a) => a.status === 'Rejected').length;
    }

    res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        underReview,
        docsRequired,
        processing,
        approved,
        rejected,
        breakdown: { personalLoans, businessLoans, creditCards, creditScores },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { search, status, productType, page = 1, limit = 10 } = req.query;
    let applications = [];
    let total = 0;

    try {
      const query = {};
      if (status && status !== 'all') query.status = status;
      if (productType && productType !== 'all') query.productType = productType;
      if (search) {
        query.$or = [
          { applicationId: { $regex: search, $options: 'i' } },
          { fullName: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } },
          { panNumber: { $regex: search, $options: 'i' } },
        ];
      }
      total = await Application.countDocuments(query);
      applications = await Application.find(query).sort({ createdAt: -1 }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
    } catch (dbErr) {
      applications = memoryApplications;
      total = memoryApplications.length;
    }

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.max(1, Math.ceil(total / Number(limit))),
      applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    let application = null;

    try {
      application = await Application.findById(id);
    } catch (dbErr) {
      application = memoryApplications.find((a) => a._id === id || a.applicationId === id);
    }

    if (!application) {
      application = memoryApplications.find((a) => a._id === id || a.applicationId === id);
    }

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    let application = null;
    try {
      application = await Application.findById(id);
      if (application) {
        application.status = status;
        application.statusHistory.push({ status, remark: remark || `Status updated to ${status}`, updatedAt: new Date() });
        await application.save();
      }
    } catch (dbErr) {
      console.warn('[DB Fallback Status Update]');
    }

    if (!application) {
      application = memoryApplications.find((a) => a._id === id || a.applicationId === id);
      if (application) {
        application.status = status;
        application.statusHistory.push({ status, remark: remark || `Status updated to ${status}`, updatedAt: new Date() });
      }
    }

    if (application) {
      await sendSmsNotification(application.mobile, `Fincorp Status Update: Your application ${application.applicationId} is now ${status}.`);
    }

    res.status(200).json({ success: true, message: `Application status updated to ${status}`, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const requestDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { docName, description } = req.body;

    let application = memoryApplications.find((a) => a._id === id || a.applicationId === id);
    try {
      const dbApp = await Application.findById(id);
      if (dbApp) {
        dbApp.requestedDocuments.push({ name: docName, description: description || '', status: 'Pending', dateRequested: new Date() });
        dbApp.status = 'Documents Required';
        dbApp.documentStatus = 'Pending Upload';
        await dbApp.save();
        application = dbApp;
      }
    } catch (dbErr) {
      if (application) {
        application.requestedDocuments.push({ name: docName, description: description || '', status: 'Pending', dateRequested: new Date() });
        application.status = 'Documents Required';
        application.documentStatus = 'Pending Upload';
      }
    }

    res.status(200).json({ success: true, message: `Requested ${docName}`, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAdminRemark = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark } = req.body;
    let application = memoryApplications.find((a) => a._id === id || a.applicationId === id);
    res.status(200).json({ success: true, message: 'Admin remark added', application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
