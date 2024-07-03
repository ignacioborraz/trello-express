import User from "../dao/mongo/User.model.js";

const register = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await User.create(data);
    return res.status(201).json({
      message: "CREATED USER_ID: " + one._id,
    });
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const { email } = req.user;
    const one = await User.findOne({ email }).select(
      "-password -createdAt -updatedAt -__v"
    );
    return res.status(200).json({
      response: one,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "LOGGED IN",
      token: req.token
    });
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await User.create(data);
    return res.status(201).json({
      message: "CREATED USER_ID: " + one._id,
    });
  } catch (error) {
    return next(error);
  }
};

const read = async (req, res, next) => {
  try {
    let queries = {};
    if (req.query.role) {
      queries.role = req.query.role;
    }
    const all = await User.find(queries)
      .select("-password -createdAt -updatedAt -__v")
      .sort("name");
    if (all.length === 0) {
      const error = new Error("USERS NOT FOUND");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      response: all,
    });
  } catch (error) {
    return next(error);
  }
};

const readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    //const one = await User.findById(id)
    const one = await User.findOne({ _id: id }).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!one) {
      const error = new Error("USER NOT FOUND");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      response: one,
    });
  } catch (error) {
    return next(error);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const opts = { new: true };
    const one = await User.findByIdAndUpdate(id, data, opts).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!one) {
      const error = new Error("USER NOT FOUND");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      response: one,
    });
  } catch (error) {
    return next(error);
  }
};

const destroyOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await User.findByIdAndDelete(id)
      .select("-password -createdAt -updatedAt -__v")
      .populate("board_id", "name");
    if (!one) {
      const error = new Error("USER NOT FOUND");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      response: one,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  register,
  profile,
  login,
  create,
  read,
  readOne,
  updateOne,
  destroyOne,
};
