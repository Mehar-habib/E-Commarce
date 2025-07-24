import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(
      "gmail service is not ready to send the email. Please check the email credentials"
    );
  } else {
    console.log("gmail service is ready to send the email");
  }
});

const sendEmail = async (to: string, subject: string, body: string) => {
  await transporter.sendMail({
    from: `"Your BookKart" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: body,
  });
};

export const sendVerificationToEmail = async (to: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">👋 Welcome to <span style="color: #3b82f6;">BookKart</span>!</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for signing up! Please confirm your email address by clicking the button below:
        </p>
        <a href="${verificationUrl}" 
           style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          ✅ Verify Email
        </a>
        <p style="font-size: 14px; color: #999;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  await sendEmail(to, "📩 Please verify your email", html);
};

export const sendResetPasswordLinkToEmail = async (
  to: string,
  token: string
) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">🔐 Reset Your Password - <span style="color: #3b82f6;">BookKart</span></h2>
        <p style="font-size: 16px; color: #555;">
          You requested a password reset. Click the button below to set a new password:
        </p>
        <a href="${resetUrl}" 
           style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          🔁 Reset Password
        </a>
        <p style="font-size: 14px; color: #999;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  await sendEmail(to, "🔁 Reset your BookKart password", html);
};
