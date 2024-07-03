import { Router } from "express";
import sessionsRouter from "./users.router.js";
import boardsRouter from "./boards.router.js";
import listsRouter from "./lists.router.js";
import cardsRouter from "./cards.router.js";

const router = Router();

router.use("/sessions", sessionsRouter);
router.use("/boards", boardsRouter);
router.use("/lists", listsRouter);
router.use("/cards", cardsRouter);

export default router;
