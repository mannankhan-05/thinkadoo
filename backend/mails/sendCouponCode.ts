import nodemailer from "nodemailer";
import logger from "../logger";

export const sendCouponCodeToMail = async (
  email: string,
  couponCode: string
) => {
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
    subject: "Coupon Code",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h2 style="color: #1976d2;">Use your coupon code to get 10% OFF on your first order !</h2>
        </div>
        <div style="text-align: center; padding: 20px; border: 1px solid #1976d2; border-radius: 5px; background-color: #f9f9f9;">
          <h1 style="color: #1976d2; font-size: 48px; margin: 0;">${couponCode}</h1>
        </div>
        <div style="padding-top: 20px;">
          <p style="color: #555;">Please enter this coupon code on the checkout page to when placing the order.</p>
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
          `Error sending coupon code to email ${email}. Error : ${err}`
        );
        reject(err);
      } else {
        logger.info(`coupon code is sent to the email ${email}`);
        resolve(couponCode);
      }
    });
  });
};
