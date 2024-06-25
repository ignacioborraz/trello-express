import express from "express";
import cors from "cors";
import morgan from "morgan";

import "dotenv/config.js";
import notFoundPath from "./src/middlewares/notFoundPath.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

const server = express();

const port = process.env.PORT || 8080;
const ready = () => console.log("server ready on port " + port);

server.listen(port, ready);

//middlewares a nivel de aplicación
//de express (incorporados)
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
//de terceros
server.use(cors());
server.use(morgan("dev"));
//manejadores


//router
server.get("/", (req, res, next) => {
  try {
    return res.status(200).json({
      message: "TRELLO API",
    });
  } catch (error) {
    return next(error);
  }
});
server.use(errorHandler);
server.use(notFoundPath);
