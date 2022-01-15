const createError = require("http-errors");
const { Hero } = require("../../modelSchema");
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Hero.findById(id);
    if (!result) {
      throw new createError(404, `Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
