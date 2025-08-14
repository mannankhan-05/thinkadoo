import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { sendForgetPasswordCode } from "../mails/resetPasswordCode";
import user from "../models/user";
import bcrypt from "bcrypt";
import logger from "../logger";
import { RequestHandler } from "express";

const saltRounds = 5;
// create a new OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// User model
interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
  authProvider: string;
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

// To get a user by id
export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;

  await user
    .findByPk(id)
    .then((userFound) => {
      if (!userFound) {
        logger.error(`User with id : ${id} not found`);
        res.status(500);
        return;
      }

      res.json(userFound);
    })
    .catch((err) => {
      logger.error(`Error getting user with id : ${id}. Error : ${err}`);
      res.sendStatus(500);
    });
};

// To create a user (sign up)
export const createUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    promotions,
  }: { name: string; email: string; password: string; promotions: boolean } =
    req.body;

  const checkEmailValidation = await user.findOne({ where: { email } });
  if (checkEmailValidation) {
    logger.error(`User with email : ${email} already exists`);
    res.status(200).json({ error: "User with this email already exists" });
    return;
  }

  // Checking if the user is admin
  let isAdmin = false;
  if (email == "abdulmannan.khan005@gmail.com") {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await user
    .create({
      name,
      email,
      password: hashedPassword,
      promotions,
      isAdmin,
    })
    .then((addedUser) => {
      logger.info(`User created with email : ${email}`);
      res.json(addedUser);
    })
    .catch((err) => {
      logger.error(`Error creating user with email : ${email}. Error : ${err}`);
      res.sendStatus(500);
    });
};

// Google Authentication
export const googleAuth: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ error: "Token is required" });
      return;
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const { name, email } = payload;

    // Check if user already exists
    let existingUser = (await user.findOne({
      where: { email },
    })) as User | null;

    // Create new user if not exists
    if (!existingUser) {
      const newUser = await user.create({
        name,
        email,
        password: null,
        promotions: true,
        isAdmin: false,
        authProvider: "google",
      });

      res.json({ status: "signup", user: newUser });
      return;
    }

    // If the user is a local account but trying to use Google
    if (existingUser.authProvider === "local" && existingUser.password) {
      res.status(400).json({
        error:
          "This email is registered with a password. Please log in with email/password.",
      });
      return;
    }

    // Returning Google login
    res.json({ status: "login", user: existingUser });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

// To login a user (sign in)
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const userFound = (await user.findOne({ where: { email } })) as User | null;

    if (!userFound) {
      logger.error(`User with email : ${email} not found`);
      res.status(500);
      return;
    }

    // Comparing the password
    const match = await bcrypt.compare(password, userFound.password);

    if (match) {
      logger.info(`User with email : ${email} is logged in`);
      res.json(userFound);
    } else {
      logger.error(`User with email : ${email} entered wrong password`);
      res.status(500);
    }
  } catch (err) {
    logger.error(`Error logging in user with email : ${email}. Error : ${err}`);
    res.status(500);
  }
};

// To edit a user's information
export const editUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    promotions,
  }: { name: string; email: string; promotions: boolean } = req.body;
  const id = req.params.userId;

  await user
    .update(
      {
        name,
        email,
        promotions,
      },
      {
        where: { id },
      }
    )
    .then(() => {
      logger.info(
        `Successfully updated the information of user having id : ${id}`
      );
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.info(`Eroor updating the information of user having id : ${id}`);
      res.sendStatus(500);
    });
};

// Sending Code to reset password to user's email
export const sendCodeToEmail = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  const userFound = await user.findOne({ where: { email } });
  if (!userFound) {
    logger.error(`User with email : ${email} not found`);
    res.status(500);
    return;
  }

  // Sending code to email
  let code = Math.floor(100000 + Math.random() * 900000);
  sendForgetPasswordCode(email, code.toString());
  res.json(code);
};

// To reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { password }: { password: string } = req.body;
  const email = req.params.email;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await user
    .update(
      {
        password: hashedPassword,
      },
      {
        where: { email },
      }
    )
    .then(() => {
      logger.info(`Password reset for user with email : ${email}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      logger.error(
        `Error resetting password for user with email : ${email}. Error : ${err}`
      );
      res.sendStatus(500);
    });
};
