// mailer.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Setup transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hebagassem911@gmail.com",
    pass: "smue mdmk uoov zctr " // App password or real password (if less secure apps allowed)
  }
});

app.post("/send-otp", async (req, res) => {
  const { email, name } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  console.log(`Sending OTP to: ${email} for ${name}`); // Debug log
  console.log(`Generated OTP: ${otp}`); // Debug log

  const mailOptions = {
    from: '"RecruitHub" <hebagassem911@gmail.com>',
    to: email,
    subject: "Your OTP Verification Code",
    text: `Dear ${name},\n\nYour One-Time Password (OTP) is: ${otp}\n\nThis code is valid for a short time. Please do not share it with anyone.\n\nBest regards,\nRecruitHub Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent successfully to: ${email}`); // Debug log
    res.json({ success: true, otp }); // Send back the OTP
  } catch (err) {
    console.error("Failed to send mail:", err);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

app.post("/send-verification-email", async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: '"RecruitHub" <hebagassem911@gmail.com>',
    to: email,
    subject: "Your Company Has Been Verified",
    text: `Dear ${name},\n\nCongratulations! Your company account has been successfully verified.\n\nYou can now log in and access all the platform features without restrictions.\n\nIf you have any questions, feel free to reach out to our support team.\n\nBest regards,\nRecruitHub Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent successfully to: ${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send verification email:", err);
    res.status(500).json({ success: false, message: "Verification email failed" });
  }
});

app.post("/send-password-reset", async (req, res) => {
  const { email, name, resetUrl } = req.body;

  const mailOptions = {
    from: '"RecruitHub" <hebagassem911@gmail.com>',
    to: email,
    subject: "Password Reset Request",
    text: `Dear ${name},\n\nYou requested a password reset.\n\nPlease click the link below to reset your password:\n${resetUrl}\n\nIf you did not request this, you can safely ignore this email.\n\nBest regards,\nRecruitHub Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent successfully to: ${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    res.status(500).json({ success: false, message: "Password reset email failed" });
  }
});



// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Mailer server running on port ${PORT}`));
