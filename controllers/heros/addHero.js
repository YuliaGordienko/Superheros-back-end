const { Hero } = require("../../modelSchema");

const addHero = async (req, res, next) => {
  try {
    const result = await Hero.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addHero;
