import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000,
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return null;
};

export const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Fincorp Support" <no-reply@fincorp.com>',
        to,
        subject,
        text,
        html,
      });
      console.log(`[Email Sent]: To: ${to} | Subject: "${subject}" | MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`[Email Transport Error]: ${err.message}`);
      return { success: false, error: err.message };
    }
  }

  // Fallback logger if SMTP credentials not configured
  console.log(`[Email Mock Sent]: To: ${to} | Subject: "${subject}"`);
  return { success: true, mock: true };
};

export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Fincorp - Your Smart Borrowing Partner';
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
      <h2 style="color: #0c2f54;">Welcome to Fincorp, ${user.name}!</h2>
      <p>Thank you for creating an account with Fincorp.</p>
      <p>You can now check free credit scores, compare loan offers, calculate EMIs, and apply for personal & business financing online.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">FINCORP FINANCIAL SERVICES LIMITED • Visakhapatnam, AP, India</p>
    </div>
  `;
  return sendEmail({ to: user.email, subject, html, text: `Welcome to Fincorp, ${user.name}!` });
};

export const sendLoginNotificationEmail = async (user) => {
  const subject = 'New Login Alert - Fincorp Account';
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
      <h3 style="color: #0c2f54;">Hello ${user.name},</h3>
      <p>Your Fincorp account was just logged into on <strong>${new Date().toLocaleString()}</strong>.</p>
      <p>If this was you, no action is needed. If you did not recognize this login, please contact support immediately.</p>
    </div>
  `;
  return sendEmail({ to: user.email, subject, html, text: `New login to your Fincorp account at ${new Date().toLocaleString()}` });
};

export const sendOtpEmail = async ({ to, otp, expiryMinutes = 5, purpose = 'Password Reset' }) => {
  const subject = `[Fincorp] ${otp} is your ${purpose} OTP Verification Code`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; color: #1e293b;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 12px 24px; border-radius: 12px; font-weight: 800; font-size: 20px; tracking: 1px;">
          FINCORP
        </div>
      </div>
      <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-bottom: 12px; text-align: center;">${purpose} Verification Code</h2>
      <p style="font-size: 14px; color: #475569; text-align: center; margin-bottom: 24px; line-height: 1.5;">
        Use the One-Time Password (OTP) below to complete your ${purpose.toLowerCase()} request. Do not share this code with anyone.
      </p>
      <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1e40af;">${otp}</span>
      </div>
      <p style="font-size: 13px; color: #64748b; text-align: center; margin-bottom: 24px;">
        ⏱️ This code will expire in <strong>${expiryMinutes} minutes</strong>.
      </p>
      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
        If you did not request this OTP, please ignore this email or contact support.
        <br/><br/>
        © ${new Date().getFullYear()} FINCORP FINANCIAL SERVICES LIMITED • Visakhapatnam, AP, India
      </div>
    </div>
  `;
  return sendEmail({
    to,
    subject,
    html,
    text: `Your Fincorp ${purpose} OTP code is ${otp}. Valid for ${expiryMinutes} minutes.`
  });
};

