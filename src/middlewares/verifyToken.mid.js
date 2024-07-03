import User from "../dao/mongo/User.model.js";
import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {
  try {
    const data = jwt.verify(req.headers.token, process.env.SECRET_JWT);
    const user = await User.findOne({ email: data.email })
    req.user = { id: user._id, email: user.email, role: user.role }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default verifyToken;
