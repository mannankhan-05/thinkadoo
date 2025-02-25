import { Request, Response } from "express";
import { nanoid } from "nanoid";
import order from "../models/order";
import book from "../models/book";
import logger from "../logger";

// Get All Orders
export const getOrders = async (req: Request, res: Response) => {
  const orderId = nanoid(20);
  console.log(orderId);
  book
    .findAll({
      include: [
        {
          model: order,
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
