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
import { Router } from "express";
const router = Router();

router.post("/register", accountExists, createHash, register);
router.post("/login", userExists, verifyHash, createToken, login);
router.post("/me", profile);
router.post("/", create);
router.get("/", read);
router.get("/:id", readOne);
router.put("/:id", updateOne);
router.delete("/:id", destroyOne);

export default router;
