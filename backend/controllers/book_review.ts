import { Request, Response } from "express";
import book_review from "../models/book_review";
import user from "../models/user";
import book from "../models/book";
import logger from "../logger";

// Get 4 book reviews
export const getBookReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await book_review.findAll({
      limit: 4,
      include: [
        {
          model: user,
        },
        {
          model: book,
        },
      ],
    });
    res.json(reviews);
  } catch (err) {
    logger.error(`Error getting book reviews: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a book review
export const createBookReview = async (req: Request, res: Response) => {
  const {
    bookId,
    userId,
    review,
    rating,
  }: { bookId: number; userId: number; review: string; rating: number } =
    req.body;

  await book_review
    .create({
      book_id: bookId,
      user_id: userId,
      review,
      rating,
    })
    .then(() => {
      logger.info(`Review for book ${bookId} created by user ${userId}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(
        `Error creating review for book ${bookId} by user ${userId}: ${err}`
      );
      res.sendStatus(500);
    });
};
