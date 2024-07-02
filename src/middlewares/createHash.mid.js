import { hashSync } from "bcrypt";

function createHash(req, res, next) {
  req.body.password = hashSync(req.body.password, 10);
  return next();
}

export default createHash;
