const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/review/:id", reviewController.addReview);

module.exports = router;