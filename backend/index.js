const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // frontend URL
app.use(express.json());

// MongoDB setup
const MONGO_URL = "mongodb://127.0.0.1:27017"; // use 127.0.0.1 instead of localhost sometimes
const DB_NAME = "PasswordDB";
let db;

async function startServer() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ MongoDB connected");

    // Ensure collection exists
    await db.createCollection("passwords").catch(() => {}); // skip if exists

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed:", err);
  }
}

startServer();

// ================= ROUTES ================= //

// GET all passwords
app.get("/passwords", async (req, res) => {
  try {
    const data = await db.collection("passwords").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// POST add password
app.post("/passwords", async (req, res) => {
  try {
    const { site, username, password } = req.body;
    if (!site || !username || !password)
      return res.status(400).json({ error: "All fields required" });

    const newPassword = { uuid: uuidv4(), site, username, password };
    const result = await db.collection("passwords").insertOne(newPassword);
    console.log("Inserted:", result.insertedId);

    res.status(201).json(newPassword);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Failed to insert password" });
  }
});

// PUT update password
app.put("/passwords/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const { site, username, password } = req.body;

    const result = await db
      .collection("passwords")
      .updateOne({ uuid }, { $set: { site, username, password } });

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Password not found" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// DELETE password
app.delete("/passwords/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const result = await db.collection("passwords").deleteOne({ uuid });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Password not found" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete password" });
  }
});
