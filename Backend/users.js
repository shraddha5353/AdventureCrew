const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();
const dbClient = mongodb.MongoClient;

// GET route for fetching users
router.get("/", async (req, res) => {
  try {
    const client = await dbClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    // Retrieve all users with only their email (or any fields you want)
    const users = await collection.find({}, { projection: { email: 1, fullName: 1 } }).toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

module.exports = router;
