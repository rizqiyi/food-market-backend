const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getFoods, postFood } = require("../controllers/foodController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}.jpg`);
  },
});

const upload = multer({
  storage,
});

router.route("/").get(getFoods).post(upload.single("photo"), postFood);

module.exports = router;
