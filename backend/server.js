const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();   // <-- Load .env

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// 1. Database Connection
const dbURI = process.env.DATABASE_URL;   // <-- Use env variable
if (!dbURI) {
  console.error("❌ DATABASE_URL not found in .env file");
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. Bank Schema
const bankSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  branchName: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true }
});

const Bank = mongoose.model('Bank', bankSchema);

// 3. API Route to Add Bank
app.post('/add-bank', async (req, res) => {
  try {
    const { bankName, branchName, accountHolderName, accountNumber, ifscCode } = req.body;

    if (!bankName || !branchName || !accountHolderName || !accountNumber || !ifscCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBank = new Bank({
      bankName,
      branchName,
      accountHolderName,
      accountNumber,
      ifscCode
    });

    await newBank.save();
    res.status(201).json({ message: "Bank Account Added Successfully!", data: newBank });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

// For Android Emulator → use 10.0.2.2
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://10.0.2.2:${PORT}`);
});
