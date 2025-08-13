import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserById,
  createUser,
  googleAuth,
  loginUser,
  editUser,
  sendCodeToEmail,
  resetPassword,
} from "../controllers/user";
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
import {
  getBookReviews,
  createBookReview,
  getReviewsByBookId,
} from "../controllers/book_review";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from "../controllers/order";
import { getOrderItems, addItemToOrder } from "../controllers/order_item";
import { createCoupon, validateCoupon } from "../controllers/coupon";

// user routes :
router.get("/users", getUsers);

router.get("/user/:userId", getUserById);

router.post("/createUser", createUser);

router.post("/google/auth", googleAuth);

router.post("/loginUser", loginUser);

router.put("/editUser/:userId", editUser);

router.post("/sendCodeToEmail", sendCodeToEmail);

router.put("/resetPassword/:email", resetPassword);

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

router.get("/bookReviews/:bookId", getReviewsByBookId);

router.post("/createBookReview", createBookReview);

// order routes :
router.get("/orders", getOrders);

router.post("/createOrder", createOrder);

router.put("/updateOrderStatus/:id", updateOrderStatus);

// order_item routes :
router.get("/orderItems/:orderId", getOrderItems);

router.post("/addItemToOrder", addItemToOrder);

// coupon routes :
router.post("/generateCoupon", createCoupon);

router.post("/validateCoupon", validateCoupon);

export default router;
