import { json } from "body-parser";
import express from "express";
import { auth } from "./firebase.js";

const app = express();

// Use the body-parser middleware to parse incoming JSON
app.use(json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: `Error registering user: ${error.message}` });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await auth().signInWithEmailAndPassword(email, password);
    res.status(200).json({ message: "User logged in successfully" });
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
