const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/", authControllers.signup);
router.post("/", authControllers.login);

module.exports = router;
