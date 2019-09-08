const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
let loggedIn = false;

app.use(express.urlencoded());

app.post("/create-user", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;
  console.log(username, password);

  let previousDatabaseState = fs.readFileSync(
    path.join(__dirname, "../assets/userdata.json"),
    "utf8"
  );

  // previousDatabaseState first time reading will be empty AKA undefined, === false, thus if false
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
  res.redirect("/login");
});

app.post("/login-user", (req, res) => {
  loggedIn = true;
});

// code associated with serving actual pages - index (signup-page) and (login-page)
app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/login.html"));
});

app.get("/", (req, res) => {
  if (loggedIn) {
    return res.sendFile(path.join(__dirname, "../assets/index.html"));
  } else {
    res.redirect("/login");
  }
});

app.listen(process.env.port || 3000);
console.log("Running at port 3000");
