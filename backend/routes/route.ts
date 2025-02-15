import express from "express";
const router = express.Router();

import { getUsers, createUser, loginUser } from "../controllers/user";

// user routes :
router.get("/users", getUsers);

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

export default router;
