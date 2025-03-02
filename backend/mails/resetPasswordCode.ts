import nodemailer from "nodemailer";
import logger from "../logger";

export const sendForgetPasswordCode = async (email: string, code: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h2 style="color: #1976d2;">Code to reset your account's password</h2>
        </div>
        <div style="text-align: center; padding: 20px; border: 1px solid #1976d2; border-radius: 5px; background-color: #f9f9f9;">
          <h1 style="color: #1976d2; font-size: 48px; margin: 0;">${code}</h1>
        </div>
        <div style="padding-top: 20px;">
          <p style="color: #555;">Please enter this code on the forget password page to complete your email verification. The code is valid for 10 minutes.</p>
          <p style="color: #555;">If you did not request this, please ignore this email or contact support.</p>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #888;">Best Regards,<br/>Thinkadoo</p>
        </div>
      </div>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        logger.error(
          `Error sending reset password code to email ${email}. Error : ${err}`
        );
        reject(err);
      } else {
        logger.info(`Reset password code sent to email ${email}`);
        resolve(code);
      }
    });
  });
};
