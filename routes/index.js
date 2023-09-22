const express = require("express");
const HomeController = require("../controllers/HomeController");

const router = express.Router();

router.route("/").get(HomeController.getHome)

module.exports = router;
