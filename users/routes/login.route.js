const express = require("express");
const router = express.Router();
const { postLogin, getUser } = require("../controllers/login");
const middleware = require("../../middlewares/middleware");

router.route("/").post(postLogin);

router.route("/user").all(middleware).get(getUser);

module.exports = router;
