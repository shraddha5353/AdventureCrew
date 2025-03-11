const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Ensure dotenv is loaded

// MongoDB Connection URI
const uri = "mongodb+srv://shraddhadeshpande64:Rani%406565@cluster0.6cqi0.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";
if (!uri) {
  console.error("❌ MONGO_URI is not set in environment variables.");
  process.exit(1); // Exit if URI is missing
}

// Create a single MongoDB client instance (better performance)
const client = new MongoClient(uri);

router.get("/", async (req, res) => {
  try {
    await client.connect(); // Connect to MongoDB

    const db = client.db("project");
    const collection = db.collection("registration");

    const users = await collection.find().toArray();
    res.status(200).send(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).send({ message: "Failed to fetch users." });
  } finally {
    await client.close(); // Close connection after request
  }
});

module.exports = router;
