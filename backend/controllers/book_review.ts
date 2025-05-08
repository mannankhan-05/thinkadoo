import { Request, Response } from "express";
import book_review from "../models/book_review";
import book from "../models/book";
import logger from "../logger";

// Get 4 book reviews
export const getBookReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await book_review.findAll({
      limit: 4,
      include: [
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

// Get all reviews for a specific book
export const getReviewsByBookId = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  await book_review
    .findAll({
      where: { book_id: bookId },
    })
    .then((reviews) => {
      logger.info(`Reviews for book ${bookId} retrieved successfully`);
      res.json(reviews);
    })
    .catch((err) => {
      logger.error(`Error getting reviews for book ${bookId}: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    });
};

// Create a book review
export const createBookReview = async (req: Request, res: Response) => {
  const {
    name,
    email,
    rating,
    review,
    bookId,
  }: {
    name: string;
    email: string;
    rating: number;
    review: string;
    bookId: number;
  } = req.body;

  await book_review
    .create({
      name,
      email,
      rating,
      review,
      book_id: bookId,
    })
    .then(() => {
      logger.info(`Review for book ${bookId} created by user ${name}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(
        `Error creating review for book ${bookId} by user ${name} : ${err}`
      );
      res.sendStatus(500);
    });
};
