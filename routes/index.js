const express = require("express");
const router = express.Router();

const admins = require("./admins");
const projets = require("./projets");
const contacts = require("./contacts");
const profile = require("./profile");

router.use("/admins", admins);
router.use("/projets", projets);
router.use("/contacts", contacts);
router.use("/profile", profile);

router.get("/", (req, res) => {
  res.send("OK");
});
module.exports = router;
