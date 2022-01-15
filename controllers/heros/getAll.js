const { Hero } = require("../../modelSchema");
const getAll = async (_, res) => {
  try {
    const heros = await Hero.find({});

    res.json({
      status: "success",
      code: 200,
      data: {
        heros,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
