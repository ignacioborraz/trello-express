import jwt from "jsonwebtoken";

async function createToken(req, res, next) {
  try {
    const token = jwt.sign(
      { email: req.body.email || req.user.email },
      process.env.SECRET_JWT,
      { expiresIn: 60 * 60 * 24 }
    );
    req.token = token;
    return next();
  } catch (error) {
    return next(error);
  }
}

export default createToken;
