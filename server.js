import { json } from "body-parser";
import express from "express";
import { auth } from "./firebase.js";
import User from "./models/user.js";
import mongoose from "mongoose";
import path from "path";

mongoose
  .connect("mongodb://localhost:27017/boricuaWedding", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

const app = express();

// Use the body-parser middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public_html")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Assuming /views is in the same directory as server.js

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const firebaseUser = userCredential.user;
    const user = new User({ email });
    await user.save();
    res
      .status(200)
      .json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    res.status(400).json({ error: `Error registering user: ${error.message}` });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    res
      .status(200)
      .json({ message: "User logged in successfully", userId: user.uid });
  } catch (error) {
    res.status(400).json({ error: `Error logging in user: ${error.message}` });
  }
});

app.get("/logout", async (req, res) => {
  try {
    await auth().signOut();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: `Error logging out user: ${error.message}` });
  }
});

app.get("/invite/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = auth().getUser(userId); // Fetches user data from Firebase
  // Here you can add the event details. It's hardcoded for now
  const event = { date: "July 14, 2024", location: "Barcelona" };
  // Render the flyer template with this data
  res.render("invite", { user: user, event: event });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
