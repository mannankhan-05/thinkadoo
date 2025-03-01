import { Request, Response } from "express";
import book from "../models/book";
import logger from "../logger";
import multer from "multer";
import path from "path";
import { Op } from "sequelize";

// Book model
interface Book {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "bookImages/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// To get all books (through infinite scrolling)
export const getBooks = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const { count, rows: books } = await book.findAndCountAll({
      limit,
      offset,
    });

    const result = books.map((allBooks: Book | any) => {
      if (allBooks.image) {
        allBooks.image = `http://localhost:5000/bookImages/${allBooks.image}`;
      }
      return allBooks;
    });

    res.json({ books: result, totalBooks: count });
  } catch (err) {
    logger.error(`Error getting all books : ${err}`);
    res.sendStatus(500);
  }
};

// To get a book by id
export const getBookById = async (req: Request, res: Response) => {
  const bookId: number = parseInt(req.params.bookId);

  await book
    .findOne({ where: { id: bookId } })
    .then((bookById) => {
      if (bookById) {
        logger.info(`Book with id ${bookId} found`);
        const bookData = { ...bookById.get() }; // get() method is used to get the data from the object
        if (bookData.image) {
          bookData.image = `http://localhost:5000/bookImages/${bookData.image}`;
        }

        res.json(bookData);
      } else {
        logger.error(`Book with id ${bookId} not found`);
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      logger.error(`Error getting book with id ${bookId} : ${err}`);
      res.sendStatus(500);
    });
};

// To get 4 random books (best selling books)
export const getBestSellingBooks = async (req: Request, res: Response) => {
  await book
    .findAll({ order: [["id", "DESC"]], limit: 4 })
    .then((randomBooks) => {
      const result = randomBooks.map((allBooks: Book | any) => {
        if (allBooks.image) {
          allBooks.image = `http://localhost:5000/bookImages/${allBooks.image}`;
        }
        return allBooks;
      });

      res.json(result);
    })
    .catch((err) => {
      logger.error(`Error getting random books : ${err}`);
      res.sendStatus(500);
    });
};

// To get 8 random books (loved by you)
export const getLovedByYouBooks = async (req: Request, res: Response) => {
  await book
    .findAll({ order: [["id", "DESC"]], limit: 8 })
    .then((lovedByYouBooks) => {
      const result = lovedByYouBooks.map((allBooks: Book | any) => {
        if (allBooks.image) {
          allBooks.image = `http://localhost:5000/bookImages/${allBooks.image}`;
        }
        return allBooks;
      });
      res.json(result);
    })
    .catch((err) => {
      logger.error(`Error getting loved by you books : ${err}`);
      res.sendStatus(500);
    });
};

// To add a new book (admin only)
export const addNewBook = async (req: Request, res: Response) => {
  upload.single("bookImage")(req, res, async (err) => {
    if (err) {
      logger.error(`Error uploading book image : ${err}`);
      return res.status(500).json({ error: "Error uploading image" });
    }

    const { title, description, price } = req.body;
    const image = req.file ? req.file.filename : "";

    if (!title || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      await book.create({ title, image, description, price });
      logger.info(`Book with title ${title} added`);
      return res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
      logger.error(`Error adding book: ${error}`);
      return res.status(500).json({ error: "Database error" });
    }
  });
};

// To update a book (admin only)
export const updateBook = (req: Request, res: Response) => {
  const bookId: number = parseInt(req.params.bookId);

  upload.single("bookImage")(req, res, async (err) => {
    if (err) {
      logger.error(`Error updating book image : ${err}`);
      res.status(500);
    }

    const {
      title,
      description,
      price,
    }: { title: string; description: string; price: number } = req.body;
    const image: string = req.file ? req.file.filename : "";

    await book
      .update(
        {
          title,
          image,
          description,
          price,
        },
        { where: { id: bookId } }
      )
      .then(() => {
        logger.info(`Book with id ${bookId} is updated`);
        res.sendStatus(200);
      })
      .catch((err) => {
        logger.error(`Error updating book with id ${bookId} : ${err}`);
        res.sendStatus(500);
      });
  });
};

// To delete a book (admin only)
export const deleteBook = async (req: Request, res: Response) => {
  const bookId: number = parseInt(req.params.bookId);

  await book
    .destroy({ where: { id: bookId } })
    .then(() => {
      logger.info(`Book with id ${bookId} is deleted`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(`Error deleting book with id ${bookId} : ${err}`);
      res.sendStatus(500);
    });
};

// To search for a book and get 5 relevant books according to the search query
export const searchBooks = async (req: Request, res: Response) => {
  const searchQuery: string = req.query.q as string;

  await book
    .findAll({
      where: {
        title: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
      limit: 5,
    })
    .then((searchedBooks) => {
      const result = searchedBooks.map((allBooks: Book | any) => {
        if (allBooks.image) {
          allBooks.image = `http://localhost:5000/bookImages/${allBooks.image}`;
        }
        return allBooks;
      });

      res.json(result);
    })
    .catch((err) => {
      logger.error(`Error searching books : ${err}`);
      res.sendStatus(500);
    });
};
