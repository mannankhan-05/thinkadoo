import { Request, Response } from "express";
import { nanoid } from "nanoid";
import order from "../models/order";
import axios from "axios";
import logger from "../logger";

const LEMONS_API = "https://api.lemonsqueezy.com/v1";

// Get All Orders (Admin only)
export const getOrders = async (req: Request, res: Response) => {
  order
    .findAll()
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
    userName,
    userEmail,
    userAddress,
    userApt,
    city,
    zip,
    country,
    userPhone,
    orderPrice,
    deliveryType,
    status,
  }: {
    userName: string;
    userEmail: string;
    userAddress: string;
    userApt: string;
    city: string;
    zip: string;
    country: string;
    userPhone: string;
    orderPrice: number;
    deliveryType: string;
    status: string;
  } = req.body;

  order
    .create({
      id: orderId,
      user_name: userName,
      user_email: userEmail,
      user_address: userAddress,
      user_apt: userApt,
      city: city,
      zip_code: zip,
      country: country,
      user_phone: userPhone,
      order_price: orderPrice,
      delivery_type: deliveryType,
      order_status: status,
    })
    .then((order) => {
      logger.info(`Order with id ${orderId} confirmed`);
      res.json(orderId);
    })
    .catch((err) => {
      logger.error(`Error confirming Order: ${err}`);
      res.sendStatus(500);
    });
};

// update Order Status (Admin only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status }: { status: string } = req.body;

  await order
    .update(
      {
        order_status: status,
      },
      {
        where: { id: id },
      }
    )
    .then(() => {
      logger.info(`Order with id ${id} updated to status ${status}`);
      res.json({ message: "Order status updated successfully" });
    })
    .catch((err) => {
      logger.error(`Error updating Order status: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    });
};

// checkout
export const checkout = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${LEMONS_API}/checkouts`,
      {
        data: {
          type: "checkouts",
          attributes: {},
          relationships: {
            store: {
              data: { type: "stores", id: process.env.LEMONS_STORE_ID },
            },
            variant: {
              data: { type: "variants", id: process.env.LEMONS_PRODUCT_ID },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMONS_API_KEY}`,
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      }
    );

    res.json({ url: response.data.data.attributes.url });
  } catch (error) {
    logger.error("error sending request to lemon squezy : " + error);
    res.status(500).json({ error: "Checkout failed" });
  }
};
