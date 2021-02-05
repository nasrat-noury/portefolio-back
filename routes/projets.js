const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM projet", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  const { name, description, date, img, tech } = req.body;
  connection.query(
    "INSERT INTO projet (name, description, date, img, tech) VALUES(?, ?, ?, ?, ?)",
    [name, description, date, img, tech],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("erreur");
      } else {
        res.status(200).send("projet posté");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const projet = req.params.id;
  connection.query("DELETE FROM projet WHERE id=?", [projet], (err) => {
    if (err) {
      res.status(500).send("Le projet est toujouts la");
    } else {
      res.status(200).send("projet effacé");
    }
  });
});

module.exports = router;
