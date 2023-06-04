// Import necessary packages
require("dotenv").config();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const User = require("./models/user");

// Initialize Express.js app
const app = express();

// Connect to the database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB:", err);
  });

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public_html")));

// User authentication middleware
app.use(async (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = await User.findById(req.session.userId);
    res.locals.user = req.user; // make it available to your views
    next();
  } else {
    // If user is not authenticated, redirect to index.html
    res.redirect("/index.html");
  }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Register route
app.post("/submit_registration", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400).send("Missing email or password");
    return;
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Create user session
    req.session.userId = user.id;

    res.status(200).send("User registered");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Login route
app.post("/submit_login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400).send("Missing email or password");
    return;
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send("User does not exist");
      return;
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).send("Incorrect password");
      return;
    }

    // Create user session
    req.session.userId = user.id;

    res.status(200).send("User logged in");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      res.status(500).send("Failed to logout");
      return;
    }
    res.clearCookie("sid");
    res.redirect("/");
  });
});

// Homepage endpoint
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
