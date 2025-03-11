require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { GoogleGenerativeAI } = require("@google/generative-ai");
//require("dotenv").config();

// MongoDB Configuration
console.log("Attempting to connect to:", process.env.MONGO_URI || "MongoDB URI not found!");

const mongoURI="mongodb+srv://shraddhadeshpande64:Rani%406565@cluster0.6cqi0.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";
// Ensure this is defined in .env
const dbName = process.env.DB_NAME; // Define database name in .env

let dbClient;

const connectToDatabase = async () => {
  if (dbClient) return dbClient.db(dbName);
  try {
    dbClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await dbClient.connect();
    console.log("✅ MongoDB Connected!");
    return dbClient.db(dbName);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to database");
  }
};

// Razorpay Configuration
const razorpay = new Razorpay({
  key_id: "rzp_test_m45f1fRZ3dhDMb",
  key_secret: "1o4J0HMMBLdRA5AfdeOaiIyh",
});

// ✅ Correct way to initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Chatbot Route (Gemini AI) ---
app.post("/api/chat", async (req, res) => {
  try {
    const { message, location } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Construct a location-based prompt
    const fullPrompt = `Provide an answer based on information specific to ${location}. User question: ${message}`;

    const chatResponse = await model.generateContent(fullPrompt);

    console.log("🔹 AI Full Response:", JSON.stringify(chatResponse, null, 2));

    const candidates = chatResponse?.response?.candidates;
    if (!candidates || candidates.length === 0) {
      return res.status(500).json({ error: `No specific information found for ${location}.` });
    }

    const reply = candidates[0]?.content?.parts?.[0]?.text?.trim() || `I couldn't find specific details for ${location}.`;

    console.log("✅ Sending AI Reply:", reply);
    res.json({ reply });

  } catch (error) {
    console.error("🔥 AI Error:", error);
    res.status(500).json({ error: "Failed to get AI response." });
  }
});

// --- Payment Routes ---
app.post("/payment/create", async (req, res) => {
  const { amount, currency = "INR" } = req.body;
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    const db = await connectToDatabase();
    await db.collection("orders").insertOne({
      orderId: order.id,
      amount,
      currency,
      status: "Created",
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Razorpay Payment
app.post("/payment/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Invalid payment verification data" });
  }
  try {
    const generatedSignature = crypto
      .createHmac("sha256", "1o4J0HMMBLdRA5AfdeOaiIyh")
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const db = await connectToDatabase();
    await db.collection("orders").updateOne(
      { orderId },
      { $set: { paymentId, signature, status: "Paid", updatedAt: new Date() } }
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

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("MongoDB URI:", mongoURI);

});
