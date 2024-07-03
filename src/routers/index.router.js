import { Router } from "express";
import sessionsRouter from "./users.router.js";
import boardsRouter from "./boards.router.js";
import listsRouter from "./lists.router.js";
import cardsRouter from "./cards.router.js";
import verifyToken from "../middlewares/verifyToken.mid.js";

const router = Router();

router.use("/sessions", sessionsRouter);
router.use("/boards", verifyToken, boardsRouter);
router.use("/lists", verifyToken, listsRouter);
router.use("/cards", verifyToken, cardsRouter);

export default router;
