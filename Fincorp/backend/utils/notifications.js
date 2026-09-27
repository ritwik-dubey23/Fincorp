export const sendSmsNotification = async (mobile, message) => {
  console.log(`[SMS SENT] -> To: ${mobile} | Message: "${message}"`);
  return { success: true, timestamp: new Date() };
};

export const sendEmailNotification = async (email, subject, body) => {
  console.log(`[EMAIL SENT] -> To: ${email} | Subject: "${subject}" | Body: "${body}"`);
  return { success: true, timestamp: new Date() };
};
