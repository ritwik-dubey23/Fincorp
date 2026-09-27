import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    dob: {
      type: String,
      default: '',
    },
    panNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    aadhaarNumber: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ['salaried', 'self_employed', 'business_owner', 'other'],
      default: 'salaried',
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    productType: {
      type: String,
      enum: ['personal_loan', 'business_loan', 'credit_score', 'credit_card'],
      default: 'personal_loan',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    pincode: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Documents Required', 'Processing', 'Approved', 'Rejected', 'Completed'],
      default: 'Submitted',
    },
    documentStatus: {
      type: String,
      enum: ['None Requested', 'Pending Upload', 'Uploaded', 'Verified', 'Rejected'],
      default: 'None Requested',
    },
    requestedDocuments: [
      {
        name: { type: String, required: true },
        description: { type: String },
        status: { type: String, default: 'Pending' },
        dateRequested: { type: Date, default: Date.now },
      },
    ],
    uploadedDocuments: [
      {
        docName: { type: String, required: true },
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
        mimeType: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    adminRemarks: [
      {
        remark: { type: String, required: true },
        createdBy: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    statusHistory: [
      {
        status: { type: String, required: true },
        remark: { type: String, default: '' },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
