const express = require("express");
const app = express();
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const Database = require("./database.js");
const database = new Database();
loggedIn = false;

app.use(express.urlencoded());

// "/create-user" is the route which stores user credentials into userdata.json via database.js
app.post("/create-user", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;
  database.storeUserData(username, password);
  res.redirect("/login");
});

// "/login-user" is the route for checking user credentials against the databse
app.post("/login-user", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;
  const result = database.checkUserData(username, password);
  const cookie = res.cookie(`${username}`, { maxAge: 300000, httpOnly: true });
  console.log(result);
  if (result) {
    loggedIn = true;
    database.createCookie(username, cookie);
    res.redirect("/");
  } else {
    res.status(401).redirect("/login");
  }
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
