import Application from '../models/Application.js';
import Otp from '../models/Otp.js';
import { sendEmailNotification, sendSmsNotification } from '../utils/notifications.js';

// In-memory fallback store for offline/unreachable DB environments
const memoryApplications = [];

const generateAppId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `FIN-${new Date().getFullYear()}-${randomNum}`;
};

export const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      dob,
      panNumber,
      aadhaarNumber,
      employmentType,
      monthlyIncome,
      requestedAmount,
      productType,
      address,
      city,
      state,
      pincode,
    } = req.body;

    if (!fullName || !mobile || !email || !panNumber || !monthlyIncome || !requestedAmount) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Invalid 10-digit mobile number' });
    }

    const applicationId = generateAppId();

    const appData = {
      _id: Date.now().toString(),
      applicationId,
      fullName,
      mobile,
      email,
      dob: dob || '',
      panNumber: panNumber.toUpperCase(),
      aadhaarNumber: aadhaarNumber || '',
      employmentType: employmentType || 'salaried',
      monthlyIncome: Number(monthlyIncome),
      requestedAmount: Number(requestedAmount),
      productType: productType || 'personal_loan',
      address: address || '',
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      status: 'Submitted',
      documentStatus: 'None Requested',
      requestedDocuments: [],
      uploadedDocuments: [],
      adminRemarks: [],
      statusHistory: [{ status: 'Submitted', remark: 'Application received online', updatedAt: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await Application.create(appData);
    } catch (dbErr) {
      console.warn('[DB Fallback]: Saved to in-memory store');
      memoryApplications.unshift(appData);
    }

    await sendSmsNotification(mobile, `Dear ${fullName}, your Fincorp application ${applicationId} has been submitted successfully.`);
    await sendEmailNotification(email, `Application Received - ${applicationId}`, `Thank you for choosing Fincorp! Your reference ID is ${applicationId}.`);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId,
      application: appData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackApplication = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Application ID or Mobile number is required' });
    }

    let results = [];
    try {
      results = await Application.find({
        $or: [
          { applicationId: query.toUpperCase() },
          { mobile: query },
        ],
      }).sort({ createdAt: -1 });
    } catch (dbErr) {
      results = memoryApplications.filter(
        (a) => a.applicationId === query.toUpperCase() || a.mobile === query
      );
    }

    if (!results || results.length === 0) {
      results = memoryApplications.filter(
        (a) => a.applicationId === query.toUpperCase() || a.mobile === query
      );
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: 'No application found with the provided details' });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      applications: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    const { applicationId, docName } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const newDoc = {
      docName: docName || req.file.originalname,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      uploadedAt: new Date(),
    };

    try {
      const application = await Application.findOne({ applicationId: applicationId.toUpperCase() });
      if (application) {
        application.uploadedDocuments.push(newDoc);
        application.documentStatus = 'Uploaded';
        await application.save();
        return res.status(200).json({
          success: true,
          message: 'Document uploaded successfully',
          uploadedDocuments: application.uploadedDocuments,
        });
      }
    } catch (dbErr) {
      console.warn('[DB Fallback Upload]');
    }

    const memApp = memoryApplications.find((a) => a.applicationId === applicationId.toUpperCase());
    if (memApp) {
      memApp.uploadedDocuments.push(newDoc);
      memApp.documentStatus = 'Uploaded';
      return res.status(200).json({
        success: true,
        message: 'Document uploaded successfully',
        uploadedDocuments: memApp.uploadedDocuments,
      });
    }

    res.status(200).json({ success: true, message: 'Document uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { memoryApplications };
