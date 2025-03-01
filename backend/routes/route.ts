import express from "express";
const router = express.Router();
import { getUsers, createUser, loginUser } from "../controllers/user";
import {
  getBooks,
  getBookById,
  getBestSellingBooks,
  getLovedByYouBooks,
  addNewBook,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controllers/book";
import { getBookReviews, createBookReview } from "../controllers/book_review";
import { getOrders, createOrder } from "../controllers/order";

// user routes :
router.get("/users", getUsers);

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

// book routes :
router.get("/books", getBooks);

router.get("/book/:bookId", getBookById);

router.get("/bestSellingBooks", getBestSellingBooks);

router.get("/lovedByYouBooks", getLovedByYouBooks);

router.post("/addBook", addNewBook);

router.put("/updateBook/:bookId", updateBook);

router.delete("/deleteBook/:bookId", deleteBook);

router.get("/searchBooks", searchBooks);

// book review routes :
router.get("/getBookReviews", getBookReviews);

router.post("/createBookReview", createBookReview);

// order routes :
router.get("/orders", getOrders);

router.post("/createOrder", createOrder);

export default router;
