import { Request, Response } from "express";
import coupon from "../models/coupon";
import { sendCouponCodeToMail } from "../mails/sendCouponCode";
import logger from "../logger";
import crypto from "crypto";

// Create a new coupon
export const createCoupon = async (req: Request, res: Response) => {
  const { userId }: { userId: number } = req.body;
  const { email }: { email: string } = req.body;

  const couponCode =
    "Thinkadoo-" + crypto.randomBytes(4).toString("hex").toUpperCase();

  await coupon
    .create({
      userId,
      code: couponCode,
    })
    .then(() => {
      logger.info(`A new coupon for user ${userId} has been created`);
      sendCouponCodeToMail(email, couponCode);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(
        `An error occurred while creating a new coupon for user ${userId}`
      );
      res.sendStatus(500);
    });
};

// Get a user's coupon
export const getCoupon = async (req: Request, res: Response) => {
  const { userId }: { userId: number } = req.body;

  const userCoupon = await coupon.findOne({
    where: {
      userId,
    },
  });

  if (!userCoupon) {
    logger.error(`Coupon for user ${userId} not found`);
    res.sendStatus(404);
  } else {
    logger.info(`Coupon for user ${userId} found`);
    res.status(200).json(userCoupon);
  }
};
