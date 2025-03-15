const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator"); // For email validation
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// ✅ Allow all origins with CORS
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));

// ✅ Connect to MongoDB using environment variable
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/contactDB";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();

// ✅ Schema and model definition
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid email address"],
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ Corrected POST route for contact form submission
app.post("/contact", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  try {
    console.log("📩 Received Contact Request:", req.body);
    
    const contact = new Contact({ email, message });
    await contact.save();
    
    console.log("✅ Contact saved successfully!");
    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (err) {
    console.error("❌ Error saving contact message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Dynamic PORT binding for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
