import { Request, Response } from "express";
import { nanoid } from "nanoid";
import order from "../models/order";
import book from "../models/book";
import logger from "../logger";

// Get All Orders (Admin only)
export const getOrders = async (req: Request, res: Response) => {
  order
    .findAll({
      include: [
        {
          model: book,
        },
      ],
    })
    .then((orders) => {
      logger.info("All Orders retrieved");
      res.json(orders);
    })
    .catch((err) => {
      logger.error(`Error retrieving Orders: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    });
};

// Create New Order
export const createOrder = async (req: Request, res: Response) => {
  const orderId = nanoid(20);
  const {
    bookId,
    userEmail,
    userAddress,
    userPhone,
    status,
  }: {
    bookId: number;
    userEmail: string;
    userAddress: string;
    userPhone: string;
    status: string;
  } = req.body;

  order
    .create({
      order_id: orderId,
      book_id: bookId,
      user_email: userEmail,
      user_address: userAddress,
      user_phone: userPhone,
      status: status,
    })
    .then((order) => {
      logger.info(`Order with id ${orderId} confirmed`);
      res.json(order);
    })
    .catch((err) => {
      logger.error(`Error confirming Order: ${err}`);
      res.sendStatus(500);
    });
};
