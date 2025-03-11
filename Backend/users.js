const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();

let client;
async function connectToDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
  }
  return client.db("project");
}

// GET route for fetching users
router.get("/", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("registration");

    // Retrieve all users with email and fullName
    const users = await collection.find({}, { projection: { email: 1, fullName: 1, _id: 0 } }).toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

module.exports = router;
