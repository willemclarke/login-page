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

  let previousDatabaseState = fs.readFileSync(
    path.join(__dirname, "../assets/userdata.json"),
    "utf8"
  );

  if (previousDatabaseState) {
    previousDatabaseState = JSON.parse(previousDatabaseState);
  }

  const userInfo = {
    ...previousDatabaseState,
    [username]: {
      password
    }
  };

  const data = JSON.stringify(userInfo, null, 2);

  fs.writeFileSync(path.join(__dirname, "../assets/userdata.json"), data);
  res.end();
});

// code associated with serving actual pages - index (signup-page) and (login-page)
app.use(express.static(path.join(__dirname, "../assets")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/index.html"));
});

app.listen(process.env.port || 3000);
console.log("Running at port 3000");
