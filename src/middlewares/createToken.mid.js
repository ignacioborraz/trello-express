import { sign } from "jsonwebtoken";

async function createToken(req, res, next) {
  try {
    const token = sign(
      { email: req.body.email || req.user.email },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    );
    req.token = token;
    return next();
  } catch (error) {
    return next(error);
  }
}

export default createToken;
