const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");
const { controllerWrapper } = require("../../middlewares");
const { Hero } = require("../../modelSchema");
const { heros: ctrl } = require("../../controllers");
const { joiContactsSchema } = require("../../modelSchema/hero");
const tempDir = path.join(__dirname, "../../", "temp");
const heros = [];
const herosDir = path.join(__dirname, "../../", "public/fotos");
const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});
const uploadMiddleware = multer({
  storage: uploadConfig,
});
router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:id", controllerWrapper(ctrl.getById));

router.post(
  "/",
  uploadMiddleware.single("file"),
  async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(herosDir, originalname);
    try {
      await fs.rename(tempUpload, resultUpload);
      const src = path.join("/fotos", originalname);
      const newHero = await Hero.create({
        ...req.body,
        images: src,
      });
      heros.push(newHero);
      res.status(201).json({
        newHero,
      });
    } catch (error) {
      await fs.unlink(tempUpload);
    }
  }
  //   controllerWrapper(ctrl.addHero)
);

router.delete("/:id", ctrl.remove);

router.put("/:id", controllerWrapper(ctrl.update));

// router.patch("/:id/:favorite", controllerWrapper(ctrl.updateStatus));
module.exports = router;
