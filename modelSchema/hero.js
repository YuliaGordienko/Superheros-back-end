const { Schema, model } = require("mongoose");
const Joi = require("joi");
const heroSchema = Schema({
  nickname: {
    type: String,
    required: [true, "Set name for contact"],
  },
  real_name: {
    type: String,
  },
  origin_description: {
    type: String,
  },
  superpowers: {
    type: String,
    required: [true, "Set superpowers for hero"],
  },
  catch_phrase: {
    type: String,
  },
  images: {
    type: String,
  },
});
const joiHerosSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string(),
  origin_description: Joi.string(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string(),
  images: Joi.string(),
});
const Hero = model("hero", heroSchema);
module.exports = {
  Hero,
  joiHerosSchema,
};
