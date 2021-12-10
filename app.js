require("dotenv").config();
require("./config/database").connect();
const express = require("express");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const User = require("./model/user");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello from auth system!</h1>");
});

// database might take some time fetching the data. changing the method to async
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password))
      res.status(400).send("All fields are required!");

    const existingUser = await User.findOne({ email }); // promise

    if (existingUser) res.status(401).send("User Already exist!");

    console.log("before bcrypt");

    const myEncPassword = await bcrypt.hash(password, 10);
    console.log("after bcrypt");

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token; // update or not in db

    //TODO: handle password situation
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
