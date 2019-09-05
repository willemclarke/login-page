const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("../assets"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/index.html"));
});

app.listen(process.env.port || 3000);
console.log("Running at port 3000");
