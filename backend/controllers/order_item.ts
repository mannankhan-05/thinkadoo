import { Request, Response } from "express";
import order_item from "../models/order_item";
import order from "../models/order";
import book from "../models/book";
import logger from "../logger";

interface Book {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
}

// Get all items in an order (by order_id)
export const getOrderItems = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  await order_item
    .findAll({
      where: { order_id: orderId },
      include: [
        {
          model: order,
        },
        {
          model: book,
        },
      ],
    })
    .then((orderItems) => {
      logger.info(`Order Items for Order ID: ${orderId} retrieved`);
      const result = orderItems.map((order: Book | any) => {
        if (order.book.image) {
          order.book.image = `http://localhost:5000/bookImages/${order.book.image}`;
        }
        return order;
      });

      res.json(result);
    })
    .catch((err) => {
      logger.error(`Error retrieving Order Items: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    });
};

// Add item to an order
export const addItemToOrder = async (req: Request, res: Response) => {
  const { orderId, bookId }: { orderId: string; bookId: number } = req.body;

  await order_item
    .create({
      order_id: orderId,
      book_id: bookId,
    })
    .then(() => {
      logger.info(`Book ID: ${bookId} added to Order ID: ${orderId}`);
      res.json({ message: "Item added to order" });
    })
    .catch((err) => {
      logger.error(`Error adding item to order: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    });
};
