const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/personRoutes");
const persons = require("./db/db");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.set("db", persons);
app.use("/person", router);

if (require.main === module) {
  app.listen(3000);
}
module.exports = app;
