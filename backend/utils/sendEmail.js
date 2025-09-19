



// utils/sendEmail.js
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, htmlContent) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // ನಿಮ್ಮ Gmail
        pass: process.env.EMAIL_PASS,   // 16-character App Password
      },
    });

    const mailOptions = {
      from: `"Study Reminder" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,  // ✅ use html instead of text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.messageId);
  } catch (error) {
    console.log("❌ Email error:", error);
  }
}

module.exports = sendEmail;
