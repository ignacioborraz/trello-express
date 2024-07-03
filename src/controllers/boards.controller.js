import Board from "../dao/mongo/Board.model.js";

const create = async (req, res, next) => {
  try {
    //del body van a venir el nombre y la description del tablero
    //del middleware de jwt va a venir el id del usuario
    const data = req.body;
    data.user_id = req.user.id
    const one = await Board.create(data);
    return res.status(201).json({
      message: "CREATED BOARD_ID: " + one._id,
    });
  } catch (error) {
    return next(error);
  }
};

const read = async (req, res, next) => {
  try {
    let queries = { user_id: req.user.id };
    //ahora el user_id es parte del requerimiento por el middleware de jwt
    /* if (req.query.user_id) {
      queries.user_id = req.query.user_id;
    } */
    const all = await Board.find(queries)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email")
      .sort("name");
    if (all.length === 0) {
      const error = new Error("BOARDS NOT FOUND");
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
    //convendria realizar un nuevo middleware para verificar que el tablero es del propietario
    const { id } = req.params;
    //const one = await Board.findById(id)
    const one = await Board.findOne({ _id: id })
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email");
    if (!one) {
      const error = new Error("BOARD NOT FOUND");
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
    const one = await Board.findByIdAndUpdate(id, data, opts)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email");
    if (!one) {
      const error = new Error("BOARD NOT FOUND");
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
    const one = await Board.findByIdAndDelete(id)
      .select("-createdAt -updatedAt -__v")
      .populate("user_id", "email");
    if (!one) {
      const error = new Error("BOARD NOT FOUND");
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
