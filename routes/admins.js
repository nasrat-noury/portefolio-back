const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM admin", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  const { pseudo, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  connection.query(
    "INSERT INTO admin (pseudo, email, password) VALUES(?, ?, ?)",
    [pseudo, email, passwordHash],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("error with the projects admin");
      } else {
        res.status(200).send("admin saved with success");
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const goodPassword = bcrypt.compareSync(password, result[0].password);
        if (goodPassword) {
          jwt.sign({ result }, process.env.SECRET_KEY_JWT, (err, token) => {
            res.json({ token });
          });
        } else {
          res.status(500).send("mot de passe incorrect");
        }
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const newUser = req.body;
  const idUser = req.params.id;

  connection.query(
    "UPDATE admin SET ? WHERE id = ?",
    [newAdmin, idAdmin],
    (err) => {
      if (err) {
        res.status(500).send("error updating admin");
      } else {
        res.status(200).send("admin successfully updated");
      }
    }
  );
});

module.exports = router;
