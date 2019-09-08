const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded());

//readfile first, then write

app.post("/create-user", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;
  console.log(username, password);

  fs.readFile("../assets/userdata.json", (err, data) => {
    if (err) throw err;
    console.log(data);
  });

  const userInfo = {
    username: {
      username,
      password
    }
  };

  const data = JSON.stringify(userInfo, null, 2);

  fs.writeFile("../assets/userdata.json", data, err => {
    if (err) throw err;
    console.log("Written to file");
  });
  res.end();
});

// code associated with serving actual pages - index (signup-page) and (login-page)
app.use(express.static("../assets"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/login.html"));
});

app.listen(process.env.port || 3000);
console.log("Running at port 3000");
