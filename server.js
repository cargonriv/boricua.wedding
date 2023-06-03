// Import necessary packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoClient = require("mongodb").MongoClient;

// Initialize Express.js app
const app = express();

// Connect to the database
const url = process.env.DB_URL;
const dbName = process.env.DB;
let db;

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error("Failed to connect to the database");
      console.error(err);
      process.exit();
    }
    db = client.db(dbName);
    console.log("Database connected!");
  }
);

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set up Express.js session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" ? true : false },
  })
);

// Set up view engine
app.set("view engine", "ejs");

app.use(express.static("public_html"));

// Routes for registration and login
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    };

    await db.collection("users").insertOne(user);
    console.log("User registered!");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.userId = user._id;
      console.log("User logged in!");
      res.redirect("/");
    } else {
      console.log("Invalid email or password");
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("sid");
    res.redirect("/");
  });
});

// Homepage endpoint
app.get("/", (req, res) => {
  res.render("index");
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
