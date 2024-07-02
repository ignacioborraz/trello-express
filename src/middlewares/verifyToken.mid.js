import { verify } from "jsonwebtoken";

async function verifyToken(req, res, next) {
  try {
    verify(req.headers.token, process.env.SECRET_JWT);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default verifyToken;
