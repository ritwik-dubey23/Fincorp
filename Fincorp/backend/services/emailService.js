import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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
