import { Router } from "express";
import {
  register,
  profile,
  login,
  create,
  read,
  readOne,
  updateOne,
  destroyOne,
} from "../controllers/users.controller.js";
import accountExists from "../middlewares/accountExists.mid.js";
import createHash from "../middlewares/createHash.mid.js";
import userExists from "../middlewares/userExists.mid.js";
import verifyHash from "../middlewares/verifyHash.mid.js";
import createToken from "../middlewares/createToken.mid.js";
import verifyToken from '../middlewares/verifyToken.mid.js';

const router = Router();

router.post("/register", accountExists, createHash, register);
router.post("/login", userExists, verifyHash, createToken, login);
router.post("/me", verifyToken, profile);
router.post("/", create);
router.get("/", read);
router.get("/:id", readOne);
router.put("/:id", verifyToken, updateOne);
router.delete("/:id", verifyToken, destroyOne);

export default router;
