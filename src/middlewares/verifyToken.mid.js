import User from "../dao/mongo/User.model.js";
import { verify } from "jsonwebtoken";

async function verifyToken(req, res, next) {
  try {
    verify(req.headers.token, process.env.SECRET_JWT);
    const user = await User.findOne({ email: data.email })
    req.user = { email: user.email, role: user.role }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default verifyToken;
