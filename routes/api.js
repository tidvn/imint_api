const express = require("express");
const AiGenerateController = require("../controllers/AiGenerateController");
const NFTController = require("../controllers/NFTController");
const middleware = require('../middleware');

const router = express.Router();
// router.use(middleware)
router.route("/image").post(AiGenerateController.genImage);
router.route("/transaction").post(NFTController.createTransaction);


module.exports = router;
