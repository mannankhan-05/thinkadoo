import express from "express";
const router = express.Router();
import { getUsers, createUser, loginUser } from "../controllers/user";
import {
  getBooks,
  getBookById,
  getRandomBooks,
  addNewBook,
  updateBook,
  deleteBook,
} from "../controllers/book";

// user routes :
router.get("/users", getUsers);

router.post("/createUser", createUser);

// router.post("/login", loginUser);

// book routes :
router.get("/books", getBooks);

router.get("/book/:bookId", getBookById);

router.get("/bestSellingBooks", getRandomBooks);

router.post("/addBook", addNewBook);

router.put("/updateBook/:bookId", updateBook);

router.delete("/deleteBook/:bookId", deleteBook);

export default router;
