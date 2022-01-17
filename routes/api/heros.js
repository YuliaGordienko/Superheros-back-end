const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "https-yuliagordienko-github-io-superheros-front-end",
  api_key: "161691791197684",
  api_secret: "2l1u-FRh-JlnpfYxa3WlmJtdBHA",
  secure: true,
});
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

      cloudinary.uploader.upload(resultUpload, async function (error, result) {
        // console.log(result);
        const src = result.url;
        const fotoName = result.public_id;
        const newHero = await Hero.create({
          ...req.body,
          images: src,
        });

        heros.push(newHero);
        res.status(201).json({
          newHero,
        });
      });
    } catch (error) {
      await fs.unlink(tempUpload);
    }
  }
  //   controllerWrapper(ctrl.addHero)
);

router.delete("/:id", ctrl.remove);

router.put("/:id", controllerWrapper(ctrl.update));

module.exports = router;
