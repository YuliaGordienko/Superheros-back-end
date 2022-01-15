const createError = require("http-errors");
const { Hero } = require("../../modelSchema");
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Hero.findByIdAndRemove(id);
    if (!result) {
      throw new createError(404, `Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "delete success",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = remove;
