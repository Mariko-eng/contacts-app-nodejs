const express = require("express");
const router = express.Router();
const { getContacts, getUserContacts } = require("../controllers/contactController");
const { createContact } = require("../controllers/contactController");
const { getContact } = require("../controllers/contactController");
const { updateContact } = require("../controllers/contactController");
const { deleteContact } = require("../controllers/contactController");
const validateUserToken = require("../middleware/validateUserToken");

// router.route("/").get(getContacts);
// router.route("/").post(createContact);
// router.route("/:id").get(getContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

// Simplify those with similar routes
router.use(validateUserToken)
router.route("/").get(getContacts).get(getUserContacts).post(createContact);
router.route("/user").get(getUserContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router