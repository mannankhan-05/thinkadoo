import { Request, Response } from "express";
import book from "../models/book";
import logger from "../logger";
import multer from "multer";
import path from "path";

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
