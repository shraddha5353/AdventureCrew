const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

// MongoDB Connection URI
const uri = "mongodb://localhost:27017";

// GET route to fetch registered users
router.get("/", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    const users = await collection.find().toArray();
    client.close();

    res.status(200).send(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send({ message: "Failed to fetch users." });
  }
});

module.exports = router;
