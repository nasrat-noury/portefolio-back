const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM contact", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.delete("/:id", (req, res) => {
  const contact = req.params.id;
  connection.query("DELETE FROM contact WHERE id=?", [contact], (err) => {
    if (err) {
      res.status(500).send("Message toujours présent");
    } else {
      res.status(200).send("message effacé");
    }
  });
});

module.exports = router;
