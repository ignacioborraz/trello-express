import User from "../dao/mongo/User.model.js";

async function userExists(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error("USER NOT REGISTERED");
      error.status = 400;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default userExists;
