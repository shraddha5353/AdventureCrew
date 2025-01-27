const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// MongoDB and Razorpay Configuration
const mongoUri = "mongodb://127.0.0.1:27017"; // MongoDB URI
const dbName = "TravelMate"; // MongoDB Database Name

// Razorpay Configuration (Your Keys)
const razorpay = new Razorpay({
  key_id: "rzp_test_m45f1fRZ3dhDMb", // Razorpay Key ID
  key_secret: "1o4J0HMMBLdRA5AfdeOaiIyh", // Razorpay Key Secret
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON data from the request body

// MongoDB connection helper function
let dbClient;
const connectToDatabase = async () => {
  if (dbClient) return dbClient.db(dbName); // Return cached database connection
  try {
    dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await dbClient.connect();
    return dbClient.db(dbName);
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Failed to connect to database");
  }
};

// --- Payment Routes ---

// 1. Create Razorpay Order
app.post("/payment/create", async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");
    await ordersCollection.insertOne({
      orderId: order.id,
      amount,
      currency,
      status: "Created",
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// 2. Verify Razorpay Payment
app.post("/payment/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Invalid payment verification data" });
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", "1o4J0HMMBLdRA5AfdeOaiIyh") // Use Razorpay Key Secret
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");

    await ordersCollection.updateOne(
      { orderId },
      {
        $set: {
          paymentId,
          signature,
          status: "Paid",
          updatedAt: new Date(),
        },
      }
    );

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying Razorpay payment", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

// --- User Routes ---
app.use("/register", require("./register"));
app.use("/login", require("./login"));
app.use("/forgotpassword", require("./forgotpassword"));
app.use("/fetch", require("./fetch"));

// Helper function to safely import routes
function tryImport(routePath) {
  try {
    const route = require(routePath);
    if (typeof route === "function" || (typeof route === "object" && typeof route.use === "function")) {
      return route;
    }
    console.error(`Invalid route export from ${routePath}`);
    return null;
  } catch (error) {
    console.error(`Failed to load route: ${routePath}`, error.message);
    return null;
  }
}

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
