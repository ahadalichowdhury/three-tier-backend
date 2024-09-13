const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Update the connection string with your MongoDB URI)
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Define Message schema
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

// Create Message model
const Message = mongoose.model("Message", messageSchema);

// POST route to save a message in the database
app.post("/api/message", async (req, res) => {
  try {
    const { text } = req.body;

    // Create a new message
    const newMessage = new Message({ text });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

// GET route to fetch messages from the database
app.get("/api/hello", async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
