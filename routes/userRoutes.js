const express = require("express")
const { registerUser, currentUser, loginUser } = require("../controllers/userController");
const validateUserToken = require("../middleware/validateUserToken");

const router = express.Router()

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateUserToken, currentUser);

module.exports = router