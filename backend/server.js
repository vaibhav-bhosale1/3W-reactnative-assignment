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
// 4. API Route to Get All Banks
app.get('/banks', async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});
// 5. API Route to Update Bank
app.put('/update-bank/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { bankName, branchName, accountHolderName, accountNumber, ifscCode } = req.body;

    await Bank.findByIdAndUpdate(id, {
      bankName, branchName, accountHolderName, accountNumber, ifscCode
    });

    res.json({ message: "Bank Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update Failed", details: error.message });
  }
});

// 6. API Route to Delete Bank
app.delete('/delete-bank/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Bank.findByIdAndDelete(id);
    res.json({ message: "Bank Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete Failed", details: error.message });
  }
});
// For Android Emulator → use 10.0.2.2
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://10.0.2.2:${PORT}`);
});
