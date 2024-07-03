import Card from "../dao/mongo/Card.model.js";

const create = async (req, res, next) => {
  try {
    const data = req.body;
    data.user_id = req.user.id
    const one = await Card.create(data);
    return res.status(201).json({
      message: "CREATED CARD_ID: " + one._id,
    });
  } catch (error) {
    return next(error);
  }
};

const read = async (req, res, next) => {
  try {
    let queries = {};
    if (req.query.user_id) {
      queries.user_id = req.query.user_id;
    }
    if (req.query.list_id) {
      queries.list_id = req.query.list_id;
    }
    const all = await Card.find(queries)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email")
      .populate("list_id", "name")
      .sort("title");
    if (all.length === 0) {
      const error = new Error("CARDS NOT FOUND");
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
    //const one = await Card.findById(id)
    const one = await Card.findOne({ _id: id })
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email")
      .populate("list_id", "name");
    if (!one) {
      const error = new Error("CARD NOT FOUND");
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
    const one = await Card.findByIdAndUpdate(id, data, opts)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email")
      .populate("list_id", "name");
    if (!one) {
      const error = new Error("CARD NOT FOUND");
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
    const one = await Card.findByIdAndDelete(id)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email")
      .populate("list_id", "name");
    if (!one) {
      const error = new Error("CARD NOT FOUND");
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

export { create, read, readOne, updateOne, destroyOne };
