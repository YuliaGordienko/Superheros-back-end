const express = require("express");
const router = express.Router();
const { controllerWrapper } = require("../../middlewares");
const { heros: ctrl } = require("../../controllers");
const { joiContactsSchema } = require("../../modelSchema/hero");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:id", controllerWrapper(ctrl.getById));

router.post("/", controllerWrapper(ctrl.addHero));

router.delete("/:id", ctrl.remove);

router.put("/:id", controllerWrapper(ctrl.update));

// router.patch("/:id/:favorite", controllerWrapper(ctrl.updateStatus));
module.exports = router;
