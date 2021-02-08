const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/*+json" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Super ça marche sur le port ${port}`);
});
