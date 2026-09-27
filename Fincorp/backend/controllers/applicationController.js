import Application from '../models/Application.js';
import { sendOtpEmail, sendEmail } from '../services/emailService.js';

// In-memory fallback store for offline/unreachable DB environments
const memoryApplications = [];
const applicationOtps = new Map();

const generateAppId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `FIN-${new Date().getFullYear()}-${randomNum}`;
};

// 1. Send Application OTP to User's Registered Email
export const sendApplicationOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = (email || req.user?.email || '').toLowerCase().trim();

    if (!userEmail) {
      return res.status(400).json({ success: false, message: 'Registered user email address is required' });
    }

    const now = Date.now();
    const existingOtp = applicationOtps.get(userEmail);
    if (existingOtp && now - existingOtp.createdAt < 60 * 1000) {
      return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 mins

    applicationOtps.set(userEmail, {
      otp: generatedOtp,
      expiresAt,
      attempts: 0,
      isVerified: false,
      createdAt: now,
    });

    console.log(`🔑 [LOAN APPLICATION OTP GENERATED] Email: ${userEmail} | OTP: ${generatedOtp}`);

    const mailResult = await sendOtpEmail({
      to: userEmail,
      otp: generatedOtp,
      expiryMinutes: 5,
      purpose: 'Loan Application',
    });

    const isEmailSent = mailResult && mailResult.success;
    const isMock = mailResult && mailResult.mock;

    res.status(200).json({
      success: true,
      message: 'OTP has been sent to your registered email address.',
      otpPreview: (!isEmailSent || isMock || process.env.NODE_ENV !== 'production') ? generatedOtp : undefined,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to send OTP to registered email' });
  }
};

// 2. Verify Application OTP
export const verifyApplicationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userEmail = (email || req.user?.email || '').toLowerCase().trim();

    if (!userEmail || !otp) {
      return res.status(400).json({ success: false, message: 'Email and 6-digit OTP code are required' });
    }

    const otpRecord = applicationOtps.get(userEmail);

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP expired or not requested. Please request a new OTP.' });
    }

    if (Date.now() > otpRecord.expiresAt) {
      applicationOtps.delete(userEmail);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    if (otpRecord.attempts >= 5) {
      applicationOtps.delete(userEmail);
      return res.status(400).json({ success: false, message: 'Too many invalid attempts. Please request a new OTP.' });
    }

    if (otpRecord.otp !== otp.toString().trim()) {
      otpRecord.attempts += 1;
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please check the code sent to your registered email.' });
    }

    otpRecord.isVerified = true;
    applicationOtps.set(userEmail, otpRecord);

    res.status(200).json({ success: true, isVerified: true, message: 'OTP verified successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'OTP verification failed' });
  }
};

// 3. Create Loan Application (Requires Auth + OTP Verification)
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
      otp,
    } = req.body;

    const userEmail = (email || req.user?.email || '').toLowerCase().trim();

    if (!fullName || !mobile || !userEmail || !panNumber || !monthlyIncome || !requestedAmount) {
      return res.status(400).json({ success: false, message: 'All mandatory loan application fields are required' });
    }

    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian mobile number' });
    }

    // Check OTP verification status
    const otpRecord = applicationOtps.get(userEmail);
    if (!otpRecord || !otpRecord.isVerified) {
      if (otp && otpRecord && otpRecord.otp === otp.toString().trim()) {
        otpRecord.isVerified = true;
      } else {
        return res.status(400).json({ success: false, message: 'OTP verification required before submitting application.' });
      }
    }

    const applicationId = generateAppId();
    const productTitle = (productType || 'personal_loan').replace('_', ' ').toUpperCase();

    const appData = {
      _id: Date.now().toString(),
      applicationId,
      user: req.user?._id || req.user?.id,
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: userEmail,
      dob: dob || '',
      panNumber: panNumber.toUpperCase().trim(),
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
      emailVerified: true,
      documentStatus: 'None Requested',
      requestedDocuments: [],
      uploadedDocuments: [],
      adminRemarks: [],
      statusHistory: [{ status: 'Submitted', remark: 'Loan application received online after email OTP verification', updatedAt: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await Application.create(appData);
    } catch (dbErr) {
      console.warn('[DB Fallback]: Saved application to memory store');
      memoryApplications.unshift(appData);
    }

    // Clear OTP after successful submission
    applicationOtps.delete(userEmail);

    // Send Final Confirmation Email to Applicant via Nodemailer
    const confirmationSubject = 'Congratulations! Your Loan Application Has Been Submitted Successfully';
    const confirmationHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 12px 24px; border-radius: 12px; font-weight: 800; font-size: 20px; letter-spacing: 1px;">
            FINCORP
          </div>
        </div>
        <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-bottom: 8px; text-align: center;">Congratulations, ${fullName.trim()}!</h2>
        <p style="font-size: 14px; color: #475569; text-align: center; margin-bottom: 24px; line-height: 1.5;">
          Your loan application has been submitted successfully and is now under review by our credit underwriting team.
        </p>
        
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Reference ID:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #1e40af; text-align: right;">${applicationId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Loan Product:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${productTitle}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Requested Amount:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">₹${Number(requestedAmount).toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Application Status:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #059669; text-align: right;">Submitted</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #475569; line-height: 1.5; margin-bottom: 20px;">
          Our financial advisor will contact you on <strong>+91 ${mobile.trim()}</strong> within 24 business hours to assist with document verification and loan approval.
        </p>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
          This is an automated confirmation of application submission. Final approval is subject to credit bureau verification.
          <br/><br/>
          © ${new Date().getFullYear()} FINCORP FINANCIAL SERVICES LIMITED • Visakhapatnam, AP, India
        </div>
      </div>
    `;

    sendEmail({
      to: userEmail,
      subject: confirmationSubject,
      html: confirmationHtml,
      text: `Congratulations ${fullName.trim()}! Your Fincorp loan application ${applicationId} for ₹${requestedAmount} has been submitted successfully.`
    }).catch((err) => console.error('[Confirmation Email Error]:', err.message));

    res.status(201).json({
      success: true,
      message: 'Congratulations! Your loan application has been submitted successfully.',
      applicationId,
      application: appData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to submit loan application' });
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
