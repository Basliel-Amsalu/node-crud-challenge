const express = require("express");
const app = express();


app.set("db", persons);
//TODO: Implement crud of person

if (require.main === module) {
  app.listen(3000);
}
module.exports = app;
