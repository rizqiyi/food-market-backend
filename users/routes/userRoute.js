const express = require("express");
const router = express.Router();
const { postRegister } = require("../controllers/userController");

router.route("/").post(postRegister);

module.exports = router;
