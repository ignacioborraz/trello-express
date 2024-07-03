import { Router } from "express";
import {
  create,
  read,
  readOne,
  updateOne,
  destroyOne,
} from "../controllers/cards.controller.js";

const router = Router();

router.post("/", create);
router.get("/", read);
router.get("/:id", readOne);
router.put("/:id", updateOne);
router.delete("/:id", destroyOne);

export default router;
