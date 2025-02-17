import { Request, Response } from "express";
import user from "../models/user";
import bcrypt from "bcrypt";
import path from "path";
const saltRounds = 5;
import logger from "../logger";

// User model
interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
}

// To get all users
export const getUsers = (req: Request, res: Response) => {
  user
    .findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

// To create a user (sign up)
export const createUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await user
    .create({
      name,
      email,
      password: hashedPassword,
    })
    .then(() => {
      logger.info(`User created with email : ${email}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(`Error creating user with email : ${email}. Error : ${err}`);
      res.sendStatus(500);
    });
};

// To login a user (sign in)
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const userFound = (await user.findOne({ where: { email } })) as User | null;

    if (!userFound) {
      logger.error(`User with email : ${email} not found`);
      return res.sendStatus(404);
    }

    // Comparing the password
    const match = await bcrypt.compare(password, userFound.password);

    if (match) {
      logger.info(`User with email : ${email} is logged in`);
      res.json(userFound);
    } else {
      logger.error(`User with email : ${email} entered wrong password`);
      return res.sendStatus(401);
    }
  } catch (err) {
    logger.error(`Error logging in user with email : ${email}. Error : ${err}`);
    res.sendStatus(500);
  }
};
