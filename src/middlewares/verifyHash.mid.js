import { compareSync } from "bcrypt";
import User from "../dao/mongo/User.model.js";

async function verifyHash(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const db_pass = user.password;
    const form_pass = req.body.password;
    if (compareSync(form_pass, db_pass)) {
      return next();
    }
    const error = new Error("INVALID CREDENTIALS");
    error.status = 400;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default verifyHash;
