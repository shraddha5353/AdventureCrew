const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// MongoDB connection URI and database name
const mongoURI ="mongodb+srv://shraddhadeshpande64:Rani%406565@cluster0.6cqi0.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "project";

// Razorpay Configuration
const razorpay = new Razorpay({
  key_id: "rzp_test_m45f1fRZ3dhDMb", // Replace with your Razorpay Key ID
  key_secret: "1o4J0HMMBLdRA5AfdeOaiIyh", // Replace with your Razorpay Key Secret
});

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
let db;
MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Force server to shut down if MongoDB connection fails
  });

// --- API ROUTES ---

// 1. Add Booking
app.post("/api/bookings", async (req, res) => {
  const { name, date, source, destination } = req.body;

  if (!name || !date || !source || !destination) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const booking = { name, date, source, destination };
    const result = await db.collection("bookings").insertOne(booking);
    res.status(201).json({ message: "Booking added successfully", booking: result.ops[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add booking" });
  }
});

// 2. Create Payment Order (Razorpay)
app.post("/api/payment/create", async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // Create an order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save order details in MongoDB
    const payment = {
      orderId: order.id,
      amount,
      status: "Created",
      createdAt: new Date(),
    };

    const result = await db.collection("payments").insertOne(payment);

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

// 3. Verify Payment (Razorpay)
app.post("/api/payment/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Invalid payment verification data" });
  }

  try {
    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("1o4J0HMMBLdRA5AfdeOaiIyh", "YOUR_RAZORPAY_KEY_SECRET") // Replace with your Razorpay Secret Key
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Update payment status in MongoDB
    const paymentUpdate = {
      paymentId,
      signature,
      status: "Paid",
      updatedAt: new Date(),
    };

    await db.collection("payments").updateOne({ orderId }, { $set: paymentUpdate });

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying Razorpay payment", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

// --- Other routes (for Destination, Explore, Payment, etc.) ---
// You can add other routes related to destinations, explore, etc.

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

