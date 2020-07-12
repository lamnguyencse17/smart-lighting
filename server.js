const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");

const app = express();


app.use(cors());
app.use(compression());
app.use(express.static("public"));


app.listen(process.env.PORT || 8080, () => {
  console.log("server started on port 8080");
});
